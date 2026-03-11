import React from 'react';

export default function ReadTab({ html, isComplete, onMarkComplete }) {
  return (
    <div className="tab-content">
      <div
        className="reading-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="mark-complete">
        {isComplete ? (
          <span className="btn btn-secondary" style={{ opacity: 0.7 }}>
            &#10003; Reading Complete
          </span>
        ) : (
          <button className="btn btn-primary" onClick={onMarkComplete}>
            &#10003; Mark as Read
          </button>
        )}
      </div>
    </div>
  );
}
