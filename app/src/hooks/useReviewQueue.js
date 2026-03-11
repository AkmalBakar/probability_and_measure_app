import { useMemo } from 'react';
import { useProgress, computeLevelStatus } from '../context/ProgressContext';
import { levels } from '../data/contentIndex';

export function useReviewQueue() {
  const { state } = useProgress();

  return useMemo(() => {
    const queue = [];

    for (const level of levels) {
      const levelId = level.meta.level;
      const status = computeLevelStatus(levelId, state);

      // Only review from levels that have been worked on
      if (status === 'locked' || status === 'available') continue;

      const ls = state.levels[levelId];
      if (!ls) continue;

      for (const [idx, ex] of Object.entries(ls.exercises)) {
        if (ex.nextReviewSession !== null && ex.nextReviewSession <= state.currentSession) {
          queue.push({
            levelId,
            exerciseIdx: parseInt(idx),
            levelTitle: level.meta.title,
          });
        }
      }
    }

    return queue;
  }, [state]);
}
