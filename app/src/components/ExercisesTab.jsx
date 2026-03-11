import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';

export default function ExercisesTab({ exercises, levelId }) {
  const { state, dispatch } = useProgress();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealStage, setRevealStage] = useState(0);
  // 0 = question only, 1..N = hints, N+1 = solution

  const levelState = state.levels[levelId];

  // Check if all exercises have been rated (this session)
  const allRated = exercises.every((_, idx) => {
    const ex = levelState?.exercises[idx];
    return ex && ex.ratings.length > 0;
  });

  if (exercises.length === 0) {
    return (
      <div className="tab-content">
        <div className="empty-state">
          <p>No exercises for this level.</p>
        </div>
      </div>
    );
  }

  if (allRated) {
    const gotIt = exercises.filter((_, idx) => levelState.exercises[idx]?.bestRating === 'got_it').length;
    const partial = exercises.filter((_, idx) => levelState.exercises[idx]?.bestRating === 'partial').length;
    const needsWork = exercises.filter((_, idx) =>
      levelState.exercises[idx]?.bestRating === 'needs_work'
    ).length;

    return (
      <div className="tab-content">
        <div className="exercise-summary">
          <h3>Level {levelId} Exercises Complete!</h3>
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="count" style={{ color: 'var(--color-got-it)' }}>{gotIt}</span>
              <span className="label">Got it</span>
            </div>
            <div className="summary-stat">
              <span className="count" style={{ color: 'var(--color-partial)' }}>{partial}</span>
              <span className="label">Partial</span>
            </div>
            <div className="summary-stat">
              <span className="count" style={{ color: 'var(--color-needs-work)' }}>{needsWork}</span>
              <span className="label">Needs work</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const exercise = exercises[currentIdx];
  const exState = levelState?.exercises[currentIdx];
  const alreadyRated = exState && exState.ratings.length > 0;
  const totalStages = exercise.hints.length + 1; // hints + solution

  const handleRate = (rating) => {
    dispatch({
      type: 'RATE_EXERCISE',
      levelId,
      exerciseIdx: currentIdx,
      rating,
      isReview: false,
    });
    // Move to next unrated exercise
    const nextUnrated = exercises.findIndex((_, idx) => {
      if (idx <= currentIdx) return false;
      const ex = levelState?.exercises[idx];
      return !ex || ex.ratings.length === 0;
    });
    if (nextUnrated >= 0) {
      setCurrentIdx(nextUnrated);
      setRevealStage(0);
    }
  };

  const difficultyClass = `badge badge-difficulty badge-${exercise.difficulty.replace(/\s+/g, '-')}`;

  return (
    <div className="tab-content">
      <div className="card">
        <div className="card-header">
          <span className="card-counter">Exercise {currentIdx + 1}/{exercises.length}</span>
          <span className={difficultyClass}>{exercise.difficulty}</span>
        </div>
        {exercise.number && <div className="card-number">{exercise.number}</div>}

        {exercise.tags.length > 0 && (
          <div className="tag-list">
            {exercise.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Question - always visible */}
        <div className="exercise-content">
          <div dangerouslySetInnerHTML={{ __html: exercise.questionHtml }} />
        </div>

        {/* Progressive reveal: hints */}
        {exercise.hints.map((hint, i) => {
          if (revealStage <= i) return null;
          return (
            <div key={i} className="reveal-section">
              <h4>Hint {i + 1}</h4>
              <div dangerouslySetInnerHTML={{ __html: hint }} />
            </div>
          );
        })}

        {/* Solution */}
        {revealStage > exercise.hints.length && (
          <div className="reveal-section">
            <h4>Solution</h4>
            <div dangerouslySetInnerHTML={{ __html: exercise.solutionHtml }} />
          </div>
        )}

        {/* Reveal buttons */}
        {!alreadyRated && revealStage <= exercise.hints.length && (
          <button
            className="btn btn-secondary"
            onClick={() => setRevealStage(revealStage + 1)}
            style={{ marginTop: 12 }}
          >
            {revealStage < exercise.hints.length
              ? `Show Hint ${revealStage + 1}`
              : 'Show Solution'}
          </button>
        )}

        {/* Rating buttons - shown after solution revealed */}
        {!alreadyRated && revealStage > exercise.hints.length && (
          <div className="rating-buttons">
            <button className="btn btn-got-it" onClick={() => handleRate('got_it')}>
              &#10003; Got it
            </button>
            <button className="btn btn-partial" onClick={() => handleRate('partial')}>
              ~ Partial
            </button>
            <button className="btn btn-needs-work" onClick={() => handleRate('needs_work')}>
              &#10007; Needs work
            </button>
          </div>
        )}

        {alreadyRated && (
          <div style={{ textAlign: 'center', padding: '12px 0', color: 'var(--color-text-muted)' }}>
            Rated: {exState.bestRating?.replace('_', ' ')}
          </div>
        )}
      </div>

      {/* Navigation between exercises */}
      <div className="card-nav" style={{ border: 'none', padding: '8px 0' }}>
        <button
          className="btn btn-secondary btn-small"
          onClick={() => { setCurrentIdx(currentIdx - 1); setRevealStage(0); }}
          disabled={currentIdx === 0}
        >
          &#8592; Prev
        </button>
        <span className="card-counter">{currentIdx + 1} / {exercises.length}</span>
        <button
          className="btn btn-secondary btn-small"
          onClick={() => { setCurrentIdx(currentIdx + 1); setRevealStage(0); }}
          disabled={currentIdx === exercises.length - 1}
        >
          Next &#8594;
        </button>
      </div>
    </div>
  );
}
