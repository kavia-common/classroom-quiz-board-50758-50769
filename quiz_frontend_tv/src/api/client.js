//
// PUBLIC_INTERFACE
// API client for the quiz frontend. Uses REACT_APP_API_BASE_URL env var.
// Provides simple wrappers and placeholder endpoints to be implemented on backend.
//
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Build full URL for API call ensuring no double slashes.
 */
function url(path) {
  const base = (BASE_URL || '').replace(/\/+$/, '');
  const p = path.replace(/^\/+/, '');
  return `${base}/${p}`;
}

/**
 * Handle JSON responses and HTTP errors
 */
async function handle(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const error = new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
    error.status = res.status;
    throw error;
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    return res.json();
  }
  return res.text();
}

// PUBLIC_INTERFACE
export async function getQuizState(sessionId) {
  /** Fetch current quiz/session state.
   * Returns: { question: {id, title, body, answerRevealed}, timers: {questionRemaining, quizRemaining}, scores: {teamA, teamB} }
   */
  const q = sessionId ? `?session=${encodeURIComponent(sessionId)}` : '';
  const res = await fetch(url(`/api/quiz/state${q}`), { credentials: 'include' });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function previousQuestion(sessionId) {
  /** Move to previous question in current session. */
  const res = await fetch(url('/api/quiz/previous'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session: sessionId })
  });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function nextQuestion(sessionId) {
  /** Move to next question in current session. */
  const res = await fetch(url('/api/quiz/next'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session: sessionId })
  });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function revealAnswer(sessionId) {
  /** Reveal the current question answer. */
  const res = await fetch(url('/api/quiz/reveal'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session: sessionId })
  });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function markCorrect(sessionId, team) {
  /** Award points to a team for the current question. team: 'A' | 'B' */
  const res = await fetch(url('/api/quiz/mark-correct'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session: sessionId, team })
  });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function undoLast(sessionId) {
  /** Undo last scoring action. */
  const res = await fetch(url('/api/quiz/undo'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session: sessionId })
  });
  return handle(res);
}
