import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ControlPanel provides teacher controls: Previous, Next, Reveal Answer, Mark Correct (A/B), Undo.
 */
export default function ControlPanel({
  onPrev,
  onNext,
  onReveal,
  onCorrectA,
  onCorrectB,
  onUndo,
  disabled
}) {
  return (
    <aside className="panel" aria-label="control panel">
      <div className="split" role="group" aria-label="navigation">
        <button className="btn btn-primary btn-block" onClick={onPrev} disabled={disabled} aria-label="Previous question">⟵ Previous</button>
        <button className="btn btn-primary btn-block" onClick={onNext} disabled={disabled} aria-label="Next question">Next ⟶</button>
      </div>

      <button className="btn btn-ghost btn-block" onClick={onReveal} disabled={disabled} aria-label="Reveal answer">
        👁 Reveal Answer
      </button>

      <div className="split" role="group" aria-label="mark correct">
        <button className="btn btn-success btn-block" onClick={onCorrectA} disabled={disabled} aria-label="Mark correct for Team A">
          ✅ Team A
        </button>
        <button className="btn btn-success btn-block" onClick={onCorrectB} disabled={disabled} aria-label="Mark correct for Team B">
          ✅ Team B
        </button>
      </div>

      <button className="btn btn-danger btn-block" onClick={onUndo} disabled={disabled} aria-label="Undo last action">
        ↩︎ Undo Last
      </button>
    </aside>
  );
}
