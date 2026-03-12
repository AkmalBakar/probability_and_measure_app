import React, { useState } from 'react';

export default function CardsTab({ keyResults, isReviewed, onMarkReviewed }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [extrasRevealed, setExtrasRevealed] = useState(false);
  const [viewedSet, setViewedSet] = useState(new Set([0]));

  if (keyResults.length === 0) {
    return (
      <div className="tab-content">
        <div className="empty-state">
          <p>No key results for this level.</p>
          {!isReviewed && (
            <button className="btn btn-primary" onClick={onMarkReviewed} style={{ marginTop: 16 }}>
              &#10003; Mark Complete
            </button>
          )}
        </div>
      </div>
    );
  }

  const card = keyResults[currentIdx];
  const allViewed = viewedSet.size >= keyResults.length;

  const goTo = (idx) => {
    setCurrentIdx(idx);
    setExtrasRevealed(false);
    setViewedSet(prev => new Set([...prev, idx]));
  };

  const badgeClass = `badge badge-${card.type}`;

  const proofContent = card.proofHtml || card.proofSketchHtml;
  const proofLabel = card.proofHtml ? 'Proof:' : 'Proof sketch:';
  const hasExtras = proofContent || card.keyTechniqueHtml || card.dependsOnHtml || card.usedByHtml;

  return (
    <div className="tab-content">
      <div className={`card ${card.loadBearing ? 'load-bearing' : ''}`}>
        <div className="card-header">
          <span className={badgeClass}>{card.type}</span>
          {card.loadBearing && <span className="badge badge-result" title="Load-bearing result">key</span>}
        </div>

        <div className="card-name">{card.name}</div>
        <div className="card-number">{card.number}</div>
        <div
          className="card-formal"
          dangerouslySetInnerHTML={{ __html: card.formalHtml }}
        />
        <div className="card-plain-english card-description" dangerouslySetInnerHTML={{ __html: card.plainEnglishHtml }} />

        {hasExtras && (
          <>
            {extrasRevealed ? (
              <div className="card-extra">
                {proofContent && (
                  <div>
                    <strong>{proofLabel}</strong>
                    <div dangerouslySetInnerHTML={{ __html: proofContent }} />
                  </div>
                )}
                {card.keyTechniqueHtml && <div><strong>Key technique:</strong> <span dangerouslySetInnerHTML={{ __html: card.keyTechniqueHtml }} /></div>}
                {card.dependsOnHtml && <div><strong>Depends on:</strong> <span dangerouslySetInnerHTML={{ __html: card.dependsOnHtml }} /></div>}
                {card.usedByHtml && <div><strong>Used by:</strong> <span dangerouslySetInnerHTML={{ __html: card.usedByHtml }} /></div>}
              </div>
            ) : (
              <button
                className="btn btn-secondary btn-small"
                onClick={() => setExtrasRevealed(true)}
                style={{ marginTop: 12 }}
              >
                Show Details
              </button>
            )}
          </>
        )}

        <div className="card-nav">
          <button
            className="btn btn-secondary btn-small"
            onClick={() => goTo(currentIdx - 1)}
            disabled={currentIdx === 0}
          >
            &#8592; Prev
          </button>
          <span className="card-counter">{currentIdx + 1} / {keyResults.length}</span>
          <button
            className="btn btn-secondary btn-small"
            onClick={() => goTo(currentIdx + 1)}
            disabled={currentIdx === keyResults.length - 1}
          >
            Next &#8594;
          </button>
        </div>
      </div>

      {allViewed && !isReviewed && (
        <div className="mark-complete">
          <button className="btn btn-primary" onClick={onMarkReviewed}>
            &#10003; Mark Key Results Complete
          </button>
        </div>
      )}
      {isReviewed && (
        <div className="mark-complete">
          <span className="btn btn-secondary" style={{ opacity: 0.7 }}>
            &#10003; Key Results Complete
          </span>
        </div>
      )}
    </div>
  );
}
