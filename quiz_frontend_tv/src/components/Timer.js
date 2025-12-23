import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Timer component to show a label and remaining time.
 */
export default function Timer({ label, seconds, color = 'var(--color-primary)', ariaLabel }) {
  const mm = Math.max(0, Math.floor((seconds || 0) / 60));
  const ss = Math.max(0, (seconds || 0) % 60);
  const pad = (n) => n.toString().padStart(2, '0');

  return (
    <div className="timer" role="timer" aria-label={ariaLabel || `${label} timer`}>
      <span className="label" style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ fontVariantNumeric: 'tabular-nums', color, fontWeight: 900 }}>
        {pad(mm)}:{pad(ss)}
      </span>
    </div>
  );
}
