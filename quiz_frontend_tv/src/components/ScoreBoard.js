import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ScoreBoard shows scores for Team A and Team B in large TV-friendly tiles.
 */
export default function ScoreBoard({ teamA = 0, teamB = 0 }) {
  return (
    <div className="scoreboard" aria-label="scoreboard">
      <div className="score-tile" aria-live="polite">
        <div className="score-name" style={{ color: 'var(--text-primary)' }}>Team A</div>
        <div className="score-value" style={{ color: 'var(--color-primary)' }}>{teamA}</div>
      </div>
      <div className="score-tile" aria-live="polite">
        <div className="score-name" style={{ color: 'var(--text-primary)' }}>Team B</div>
        <div className="score-value" style={{ color: 'var(--color-primary)' }}>{teamB}</div>
      </div>
    </div>
  );
}
