import React, { useState } from 'react';
import { useProgress, computeLevelStatus } from '../context/ProgressContext';
import { levelMap } from '../data/contentIndex';
import { navigate } from '../App';
import ReadTab from './ReadTab';
import CardsTab from './CardsTab';
import ExercisesTab from './ExercisesTab';

const TABS = [
  { id: 'read', label: 'Read', icon: '\u{1F4D6}' },
  { id: 'cards', label: 'Key Results', icon: '\u{1F4CB}' },
  { id: 'exercises', label: 'Exercises', icon: '\u2694\uFE0F' },
];

export default function LevelScreen({ levelId, initialTab }) {
  const [activeTab, setActiveTab] = useState(initialTab || 'read');
  const { state, dispatch } = useProgress();

  const level = levelMap[levelId];
  if (!level) {
    return (
      <div className="level-screen">
        <p>Level {levelId} not found.</p>
        <button className="btn btn-secondary" onClick={() => navigate('#/')}>Back to Map</button>
      </div>
    );
  }

  const status = computeLevelStatus(levelId, state);
  const ls = state.levels[levelId];

  const handleMarkRead = () => {
    dispatch({ type: 'MARK_READ', levelId });
  };

  const handleMarkKeyResults = () => {
    dispatch({ type: 'MARK_KEY_RESULTS', levelId });
  };

  const statusColors = {
    locked: '#4b5563',
    available: '#ef4444',
    in_progress: '#f59e0b',
    mastered: '#22c55e',
    perfected: '#eab308',
  };

  return (
    <div className="level-screen">
      <div className="level-header">
        <button className="back-btn" onClick={() => navigate('#/')}>
          &#8592;
        </button>
        <h1>Level {levelId}: {level.meta.title}{level.meta.status === 'wip' && <span className="badge badge-wip" style={{ marginLeft: 8, verticalAlign: 'middle' }}>WIP</span>}</h1>
        <span
          className="level-status"
          style={{
            background: statusColors[status] || statusColors.locked,
            color: status === 'in_progress' || status === 'perfected' ? '#1e293b' : 'white',
          }}
        >
          {status.replace('_', ' ')}
        </span>
      </div>

      <div className="tab-bar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.id === 'read' && ls?.readComplete && <span className="tab-check"> &#10003;</span>}
            {tab.id === 'cards' && ls?.keyResultsReviewed && <span className="tab-check"> &#10003;</span>}
            {tab.id === 'exercises' && status === 'perfected' && <span className="tab-check"> &#10003;</span>}
          </button>
        ))}
      </div>

      {activeTab === 'read' && (
        <ReadTab
          html={level.readingHtml}
          isComplete={ls?.readComplete || false}
          onMarkComplete={handleMarkRead}
        />
      )}

      {activeTab === 'cards' && (
        <CardsTab
          keyResults={level.keyResults}
          isReviewed={ls?.keyResultsReviewed || false}
          onMarkReviewed={handleMarkKeyResults}
        />
      )}

      {activeTab === 'exercises' && (
        <ExercisesTab
          exercises={level.exercises}
          levelId={levelId}
        />
      )}
    </div>
  );
}
