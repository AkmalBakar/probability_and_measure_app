import React from 'react';
import MasteryMap from './MasteryMap';
import { useProgress, computeLevelStatus } from '../context/ProgressContext';
import { useReviewQueue } from '../hooks/useReviewQueue';
import { levels } from '../data/contentIndex';
import { navigate } from '../App';

export default function MapScreen() {
  const { state } = useProgress();
  const reviewQueue = useReviewQueue();

  // Find first available or in-progress level for "Continue" button
  const continueLevel = levels.find(l => {
    const s = computeLevelStatus(l.meta.level, state);
    return s === 'in_progress';
  }) || levels.find(l => {
    const s = computeLevelStatus(l.meta.level, state);
    return s === 'available';
  });

  return (
    <div className="map-screen">
      <div className="map-actions">
        {continueLevel && (
          <button
            className="btn btn-primary"
            onClick={() => navigate(`#/level/${continueLevel.meta.level}`)}
          >
            &#9654; Continue: Level {continueLevel.meta.level}
          </button>
        )}
        <button
          className="btn btn-secondary"
          onClick={() => navigate('#/review')}
          disabled={reviewQueue.length === 0}
        >
          &#128218; Daily Review ({reviewQueue.length})
        </button>
      </div>
      <MasteryMap />
    </div>
  );
}
