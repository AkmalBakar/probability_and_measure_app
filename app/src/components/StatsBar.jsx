import React from 'react';
import { useProgress, computeLevelStatus } from '../context/ProgressContext';
import { useReviewQueue } from '../hooks/useReviewQueue';
import { levels } from '../data/contentIndex';

export default function StatsBar() {
  const { state } = useProgress();
  const reviewQueue = useReviewQueue();

  const masteredCount = levels.filter(l => {
    const s = computeLevelStatus(l.meta.level, state);
    return s === 'mastered' || s === 'perfected';
  }).length;

  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-icon">&#9889;</span>
        <span className="stat-value">{state.xp}</span> XP
      </div>
      <div className="stat">
        <span className="stat-icon">&#128293;</span>
        <span className="stat-value">{state.streakDays}</span> day{state.streakDays !== 1 ? 's' : ''}
        {state.streakFreezes > 0 && <span title="Streak freeze available"> &#10052;</span>}
      </div>
      <div className="stat">
        <span className="stat-icon">&#9733;</span>
        <span className="stat-value">{masteredCount}/24</span> mastered
      </div>
      <div className="stat">
        <span className="stat-icon">&#128218;</span>
        <span className="stat-value">{reviewQueue.length}</span> reviews
      </div>
    </div>
  );
}
