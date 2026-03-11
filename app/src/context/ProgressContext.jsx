import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { levels, levelMap } from '../data/contentIndex';

const ProgressContext = createContext(null);
const STORAGE_KEY = 'ma411_progress';
const SAVE_DEBOUNCE_MS = 500;

// XP values
const XP = {
  READ: 10,
  KEY_RESULTS: 15,
  GOT_IT_FIRST: 25,
  GOT_IT_REVIEW: 10,
  PARTIAL: 5,
  LEVEL_COMPLETE: 50,
};

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function initializeState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Ensure all levels exist in state (in case new levels added)
      for (const l of levels) {
        if (!parsed.levels[l.meta.level]) {
          parsed.levels[l.meta.level] = createLevelState(l);
        }
      }
      return parsed;
    } catch (e) {
      console.error('Failed to parse saved progress, resetting:', e);
    }
  }
  return createFreshState();
}

function createFreshState() {
  const state = {
    levels: {},
    xp: 0,
    currentSession: 1,
    streakDays: 0,
    lastPracticeDate: null,
    streakFreezes: 0,
    lastModified: Date.now(),
  };
  for (const l of levels) {
    state.levels[l.meta.level] = createLevelState(l);
  }
  return state;
}

function createLevelState(level) {
  const exercises = {};
  level.exercises.forEach((_, idx) => {
    exercises[idx] = {
      ratings: [],
      bestRating: null,
      gotItCount: 0,
      nextReviewSession: null,
    };
  });
  return {
    readComplete: false,
    keyResultsReviewed: false,
    exercises,
  };
}

function getNextReviewSession(currentSession, rating, gotItCount) {
  switch (rating) {
    case 'needs_work': return currentSession + 1;
    case 'partial': return currentSession + 3;
    case 'got_it':
      if (gotItCount >= 3) return null; // mastered, exits queue
      if (gotItCount === 2) return currentSession + 10;
      return currentSession + 5;
    default: return null;
  }
}

export function computeLevelStatus(levelId, state) {
  const levelData = levelMap[levelId];
  if (!levelData) return 'available';

  const ls = state.levels[levelId];
  if (!ls) return 'available';

  const exerciseEntries = Object.values(ls.exercises);
  const totalExercises = exerciseEntries.length;

  // Check if any work done
  const hasAnyWork = ls.readComplete || ls.keyResultsReviewed ||
    exerciseEntries.some(e => e.ratings.length > 0);

  if (!hasAnyWork) return 'available';

  // Check completion
  const allAttempted = totalExercises === 0 || exerciseEntries.every(e => e.ratings.length > 0);
  const gotItCount = exerciseEntries.filter(e => e.bestRating === 'got_it').length;

  if (totalExercises > 0 && allAttempted && gotItCount === totalExercises) {
    return 'perfected';
  }

  if (totalExercises > 0 && allAttempted && gotItCount >= totalExercises * 0.5) {
    return 'mastered';
  }

  // For levels with no exercises, mastered if read + key results done
  if (totalExercises === 0 && ls.readComplete && ls.keyResultsReviewed) {
    return 'mastered';
  }

  return 'in_progress';
}

function checkAndUpdateStreak(state) {
  const today = getToday();
  if (state.lastPracticeDate === today) return state;

  const newState = { ...state };
  if (state.lastPracticeDate) {
    const last = new Date(state.lastPracticeDate);
    const now = new Date(today);
    const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day
      newState.streakDays += 1;
    } else if (diffDays === 2 && state.streakFreezes > 0) {
      // Missed one day, use freeze
      newState.streakFreezes -= 1;
      newState.streakDays += 1;
    } else if (diffDays > 1) {
      // Streak broken
      newState.streakDays = 1;
    }
  } else {
    newState.streakDays = 1;
  }

  newState.lastPracticeDate = today;

  // Award streak freeze every 7 days
  if (newState.streakDays > 0 && newState.streakDays % 7 === 0) {
    newState.streakFreezes = Math.min(newState.streakFreezes + 1, 1);
  }

  return newState;
}

function checkLevelCompletion(state, levelId) {
  const prevStatus = computeLevelStatus(levelId, { ...state, _skipLevel: levelId });
  const newStatus = computeLevelStatus(levelId, state);

  if ((newStatus === 'mastered' || newStatus === 'perfected') &&
      prevStatus !== 'mastered' && prevStatus !== 'perfected') {
    return XP.LEVEL_COMPLETE;
  }
  return 0;
}

function reducer(state, action) {
  let newState;

  switch (action.type) {
    case 'MARK_READ': {
      const ls = state.levels[action.levelId];
      if (ls.readComplete) return state;
      newState = {
        ...state,
        levels: {
          ...state.levels,
          [action.levelId]: { ...ls, readComplete: true },
        },
        xp: state.xp + XP.READ,
      };
      newState = checkAndUpdateStreak(newState);
      break;
    }

    case 'MARK_KEY_RESULTS': {
      const ls = state.levels[action.levelId];
      if (ls.keyResultsReviewed) return state;
      newState = {
        ...state,
        levels: {
          ...state.levels,
          [action.levelId]: { ...ls, keyResultsReviewed: true },
        },
        xp: state.xp + XP.KEY_RESULTS,
      };
      newState = checkAndUpdateStreak(newState);
      break;
    }

    case 'RATE_EXERCISE': {
      const { levelId, exerciseIdx, rating, isReview } = action;
      const ls = state.levels[levelId];
      const ex = ls.exercises[exerciseIdx];
      const newGotItCount = rating === 'got_it' ? ex.gotItCount + 1 : ex.gotItCount;

      let xpGain = 0;
      if (rating === 'got_it') {
        xpGain = isReview ? XP.GOT_IT_REVIEW : XP.GOT_IT_FIRST;
      } else if (rating === 'partial') {
        xpGain = XP.PARTIAL;
      }

      const newExercise = {
        ...ex,
        ratings: [...ex.ratings, rating],
        bestRating: rating === 'got_it' ? 'got_it' :
                    (ex.bestRating === 'got_it' ? 'got_it' :
                     rating === 'partial' ? 'partial' :
                     ex.bestRating),
        gotItCount: newGotItCount,
        nextReviewSession: getNextReviewSession(state.currentSession, rating, newGotItCount),
      };

      newState = {
        ...state,
        levels: {
          ...state.levels,
          [levelId]: {
            ...ls,
            exercises: { ...ls.exercises, [exerciseIdx]: newExercise },
          },
        },
        xp: state.xp + xpGain,
      };

      // Check for level completion bonus
      const completionXp = checkLevelCompletion(newState, levelId);
      newState.xp += completionXp;
      if (completionXp > 0) {
        newState._levelCompleted = levelId;
        newState._bonusXp = completionXp;
      }

      newState = checkAndUpdateStreak(newState);
      break;
    }

    case 'INCREMENT_SESSION': {
      newState = {
        ...state,
        currentSession: state.currentSession + 1,
      };
      break;
    }

    case 'LOAD_SERVER_STATE': {
      return action.state;
    }

    default:
      return state;
  }

  newState.lastModified = Date.now();
  return newState;
}

function cleanState(state) {
  const toSave = { ...state };
  delete toSave._levelCompleted;
  delete toSave._bonusXp;
  return toSave;
}

function saveToServer(data) {
  fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).catch(() => { /* offline — localStorage still has it */ });
}

export function ProgressProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, initializeState);
  const serverLoaded = useRef(false);
  const saveTimer = useRef(null);

  // On mount: fetch server state, keep whichever copy is newer
  useEffect(() => {
    fetch('/api/progress')
      .then(r => r.json())
      .then(serverData => {
        if (!serverData || !serverData.levels) return;
        // Ensure all levels exist
        for (const l of levels) {
          if (!serverData.levels[l.meta.level]) {
            serverData.levels[l.meta.level] = createLevelState(l);
          }
        }
        const serverTime = serverData.lastModified || 0;
        const localTime = state.lastModified || 0;
        if (serverTime > localTime) {
          dispatch({ type: 'LOAD_SERVER_STATE', state: serverData });
        }
      })
      .catch(() => { /* server unavailable, use localStorage */ })
      .finally(() => { serverLoaded.current = true; });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist to localStorage + debounced server save
  useEffect(() => {
    const data = cleanState(state);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveToServer(data), SAVE_DEBOUNCE_MS);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [state]);

  const value = React.useMemo(() => ({ state, dispatch }), [state]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
