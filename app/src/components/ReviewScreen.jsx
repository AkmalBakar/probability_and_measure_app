import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { useReviewQueue } from '../hooks/useReviewQueue';
import { levelMap } from '../data/contentIndex';
import { navigate } from '../App';

export default function ReviewScreen() {
  const { state, dispatch } = useProgress();
  const reviewQueue = useReviewQueue();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealStage, setRevealStage] = useState(0);
  const [completedThisSession, setCompletedThisSession] = useState(0);

  if (reviewQueue.length === 0 || currentIdx >= reviewQueue.length) {
    return (
      <div className="review-screen">
        <div className="review-header">
          <button className="back-btn" onClick={() => navigate('#/')}>
            &#8592;
          </button>
          <h1>Daily Review</h1>
        </div>
        <div className="empty-state">
          <div className="empty-icon">&#127881;</div>
          <h2>All caught up!</h2>
          <p>
            {completedThisSession > 0
              ? `You reviewed ${completedThisSession} exercise${completedThisSession !== 1 ? 's' : ''} this session.`
              : 'No exercises due for review right now.'
            }
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('#/')}
            style={{ marginTop: 20 }}
          >
            Back to Map
          </button>
        </div>
      </div>
    );
  }

  const item = reviewQueue[currentIdx];
  const level = levelMap[item.levelId];
  const exercise = level?.exercises[item.exerciseIdx];

  if (!exercise) {
    setCurrentIdx(currentIdx + 1);
    return null;
  }

  const handleRate = (rating) => {
    dispatch({
      type: 'RATE_EXERCISE',
      levelId: item.levelId,
      exerciseIdx: item.exerciseIdx,
      rating,
      isReview: true,
    });
    setCompletedThisSession(c => c + 1);
    setCurrentIdx(currentIdx + 1);
    setRevealStage(0);
  };

  const difficultyClass = `badge badge-difficulty badge-${exercise.difficulty.replace(/\s+/g, '-')}`;

  return (
    <div className="review-screen">
      <div className="review-header">
        <button className="back-btn" onClick={() => navigate('#/')}>
          &#8592;
        </button>
        <h1>Daily Review ({currentIdx + 1}/{reviewQueue.length})</h1>
      </div>

      <div className="review-source">
        From Level {item.levelId}: {item.levelTitle}
      </div>

      <div className="card">
        <div className="card-header">
          <span className={difficultyClass}>{exercise.difficulty}</span>
          {exercise.number && <span className="card-number">{exercise.number}</span>}
        </div>

        {exercise.tags.length > 0 && (
          <div className="tag-list">
            {exercise.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="exercise-content">
          <div dangerouslySetInnerHTML={{ __html: exercise.questionHtml }} />
        </div>

        {exercise.hints.map((hint, i) => {
          if (revealStage <= i) return null;
          return (
            <div key={i} className="reveal-section">
              <h4>Hint {i + 1}</h4>
              <div dangerouslySetInnerHTML={{ __html: hint }} />
            </div>
          );
        })}

        {revealStage > exercise.hints.length && (
          <div className="reveal-section">
            <h4>Solution</h4>
            <div dangerouslySetInnerHTML={{ __html: exercise.solutionHtml }} />
          </div>
        )}

        {revealStage <= exercise.hints.length && (
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

        {revealStage > exercise.hints.length && (
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
      </div>
    </div>
  );
}
