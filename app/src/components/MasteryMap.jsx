import React from 'react';
import { useProgress, computeLevelStatus } from '../context/ProgressContext';
import { levels, levelMap } from '../data/contentIndex';
import { navigate } from '../App';

// Hardcoded node positions — two-column layout
// Left: Notes 1-3 (levels 1-12), Right: Notes 4-6 (levels 13-24)
const COL_LEFT = 100;
const COL_RIGHT = 280;
const Y_START = 40;
const Y_STEP = 52;

const NODE_POSITIONS = {
  // Notes 1 (levels 1-6)
  1:  { x: COL_LEFT, y: Y_START },
  2:  { x: COL_LEFT, y: Y_START + Y_STEP },
  3:  { x: COL_LEFT, y: Y_START + Y_STEP * 2 },
  4:  { x: COL_LEFT, y: Y_START + Y_STEP * 3 },
  5:  { x: COL_LEFT, y: Y_START + Y_STEP * 4 },
  6:  { x: COL_LEFT, y: Y_START + Y_STEP * 5 },
  // Notes 2 (levels 7-10)
  7:  { x: COL_LEFT, y: Y_START + Y_STEP * 6 },
  8:  { x: COL_LEFT, y: Y_START + Y_STEP * 7 },
  9:  { x: COL_LEFT, y: Y_START + Y_STEP * 8 },
  10: { x: COL_LEFT, y: Y_START + Y_STEP * 9 },
  // Notes 3 (levels 11-12)
  11: { x: COL_LEFT, y: Y_START + Y_STEP * 10 },
  12: { x: COL_LEFT, y: Y_START + Y_STEP * 11 },
  // Notes 4 (levels 13-17)
  13: { x: COL_RIGHT, y: Y_START + Y_STEP * 2 },
  14: { x: COL_RIGHT, y: Y_START + Y_STEP * 3 },
  15: { x: COL_RIGHT, y: Y_START + Y_STEP * 4 },
  16: { x: COL_RIGHT - 50, y: Y_START + Y_STEP * 5 },
  17: { x: COL_RIGHT + 50, y: Y_START + Y_STEP * 5 },
  18: { x: COL_RIGHT, y: Y_START + Y_STEP * 6 },
  // Notes 5 (levels 19-22)
  19: { x: COL_RIGHT, y: Y_START + Y_STEP * 7 },
  20: { x: COL_RIGHT, y: Y_START + Y_STEP * 8 },
  21: { x: COL_RIGHT - 50, y: Y_START + Y_STEP * 9 },
  22: { x: COL_RIGHT + 50, y: Y_START + Y_STEP * 9 },
  // Notes 6 (levels 23-24)
  23: { x: COL_RIGHT, y: Y_START + Y_STEP * 10 },
  24: { x: COL_RIGHT, y: Y_START + Y_STEP * 11 },
};

const NODE_RADIUS = 20;

// Abbreviated titles for display
const SHORT_TITLES = {
  1: 'Discrete Prob',
  2: 'RV & Expect',
  3: 'Ineq & Indep',
  4: 'Sigma-Algebras',
  5: 'Continuity',
  6: 'Caratheodory',
  7: 'Meas. Func',
  8: 'Approx.',
  9: 'Integral',
  10: 'MCT/DCT',
  11: 'Hoeffding',
  12: 'Sub-Gauss',
  13: 'CE Events',
  14: 'CE Sigma-Alg',
  15: 'CE Properties',
  16: 'Radon-Nik.',
  17: 'Martingale 1',
  18: 'ODE Approx',
  19: 'Load Bal.',
  20: 'Markov Ch.',
  21: 'Convergence',
  22: 'Mart. Trans.',
  23: 'Stop Times',
  24: 'Binom. Fin.',
};

const STATUS_COLORS = {
  locked: { fill: '#1e293b', stroke: '#4b5563' },
  available: { fill: '#1e293b', stroke: '#ef4444' },
  in_progress: { fill: '#422006', stroke: '#f59e0b' },
  mastered: { fill: '#052e16', stroke: '#22c55e' },
  perfected: { fill: '#422006', stroke: '#eab308' },
};

export default function MasteryMap() {
  const { state } = useProgress();

  // Build edges from prerequisites
  const edges = [];
  for (const level of levels) {
    const to = level.meta.level;
    for (const from of level.meta.prerequisites) {
      if (NODE_POSITIONS[from] && NODE_POSITIONS[to]) {
        edges.push({ from, to });
      }
    }
  }

  const svgHeight = Y_START + Y_STEP * 12 + 20;

  return (
    <div className="mastery-map-container">
      <svg className="mastery-map" viewBox={`0 0 380 ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
        {/* Edges */}
        {edges.map(({ from, to }) => {
          const p1 = NODE_POSITIONS[from];
          const p2 = NODE_POSITIONS[to];
          return (
            <line
              key={`${from}-${to}`}
              className="map-edge"
              x1={p1.x} y1={p1.y}
              x2={p2.x} y2={p2.y}
            />
          );
        })}

        {/* Nodes */}
        {levels.map(level => {
          const id = level.meta.level;
          const pos = NODE_POSITIONS[id];
          if (!pos) return null;
          const status = computeLevelStatus(id, state);
          const colors = STATUS_COLORS[status] || STATUS_COLORS.locked;

          return (
            <g
              key={id}
              className={`map-node status-${status}`}
              onClick={() => navigate(`#/level/${id}`)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                className="map-node-circle"
                cx={pos.x} cy={pos.y} r={NODE_RADIUS}
                fill={colors.fill}
                stroke={colors.stroke}
                strokeWidth={status === 'perfected' ? 3 : 2.5}
              />
              <text className="map-node-label" x={pos.x} y={pos.y}>
                {id}
              </text>
              <text className="map-node-title" x={pos.x} y={pos.y + NODE_RADIUS + 10}>
                {SHORT_TITLES[id] || ''}
              </text>
              {level.meta.status === 'wip' && (
                <text className="map-node-wip" x={pos.x} y={pos.y + NODE_RADIUS + 18}>
                  WIP
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
