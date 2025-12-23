import React from 'react';

/**
 * PUBLIC_INTERFACE
 * QuestionCard renders the large central question with title/body and optional answer reveal.
 */
export default function QuestionCard({ title, body, answer, answerRevealed }) {
  return (
    <article className="card question-card" aria-label="question">
      {title ? (
        <h1 className="question-title">{title}</h1>
      ) : (
        <div className="question-title" aria-hidden="true">Loading question…</div>
      )}
      <div className="question-body">{body || ' '}</div>
      {answerRevealed && answer ? (
        <div className="answer-badge" role="status" aria-live="polite">Answer: {answer}</div>
      ) : null}
    </article>
  );
}
