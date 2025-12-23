import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import Timer from './components/Timer';
import ScoreBoard from './components/ScoreBoard';
import QuestionCard from './components/QuestionCard';
import ControlPanel from './components/ControlPanel';
import {
  getQuizState,
  previousQuestion,
  nextQuestion,
  revealAnswer,
  markCorrect,
  undoLast
} from './api/client';

// PUBLIC_INTERFACE
/**
 * App renders the TV-facing teacher control UI.
 * - Layout: top timers, large central question, bottom scoreboard, right control panel.
 * - Polls the backend for current session state every 1.5s.
 */
function App() {
  const [theme] = useState('light'); // fixed light theme per style guide
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [state, setState] = useState({
    question: { id: null, title: '', body: '', answer: '', answerRevealed: false },
    timers: { questionRemaining: 0, quizRemaining: 0 },
    scores: { teamA: 0, teamB: 0 }
  });

  // simple celebration flag -> renders emoji burst for 900ms
  const [celebrate, setCelebrate] = useState(false);
  const celebrateTimeout = useRef(null);

  const sessionId = useMemo(() => null, []); // extend later if session routing is added

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Poll state
  useEffect(() => {
    let mounted = true;
    let timerId;

    const load = async () => {
      try {
        const data = await getQuizState(sessionId);
        if (!mounted) return;
        setState({
          question: {
            id: data?.question?.id ?? null,
            title: data?.question?.title ?? '',
            body: data?.question?.body ?? '',
            answer: data?.question?.answer ?? '',
            answerRevealed: Boolean(data?.question?.answerRevealed)
          },
          timers: {
            questionRemaining: Number.isFinite(data?.timers?.questionRemaining) ? data.timers.questionRemaining : 0,
            quizRemaining: Number.isFinite(data?.timers?.quizRemaining) ? data.timers.quizRemaining : 0
          },
          scores: {
            teamA: Number.isFinite(data?.scores?.teamA) ? data.scores.teamA : 0,
            teamB: Number.isFinite(data?.scores?.teamB) ? data.scores.teamB : 0
          }
        });
        setErr(null);
        setLoading(false);
      } catch (e) {
        // Keep showing last state, but surface error message
        setErr(e.message || 'Failed to load state');
        setLoading(false);
      }
    };

    load();
    timerId = setInterval(load, 1500);

    return () => {
      mounted = false;
      clearInterval(timerId);
    };
  }, [sessionId]);

  // Celebration helper
  const triggerCelebrate = () => {
    setCelebrate(true);
    if (celebrateTimeout.current) clearTimeout(celebrateTimeout.current);
    celebrateTimeout.current = setTimeout(() => setCelebrate(false), 900);
  };

  // Handlers
  const handlePrev = async () => {
    try {
      await previousQuestion(sessionId);
      setErr(null);
    } catch (e) {
      setErr(e.message || 'Failed to go to previous question');
    }
  };
  const handleNext = async () => {
    try {
      await nextQuestion(sessionId);
      setErr(null);
    } catch (e) {
      setErr(e.message || 'Failed to go to next question');
    }
  };
  const handleReveal = async () => {
    try {
      await revealAnswer(sessionId);
      setErr(null);
    } catch (e) {
      setErr(e.message || 'Failed to reveal answer');
    }
  };
  const handleCorrectA = async () => {
    try {
      await markCorrect(sessionId, 'A');
      triggerCelebrate();
      setErr(null);
    } catch (e) {
      setErr(e.message || 'Failed to mark correct for Team A');
    }
  };
  const handleCorrectB = async () => {
    try {
      await markCorrect(sessionId, 'B');
      triggerCelebrate();
      setErr(null);
    } catch (e) {
      setErr(e.message || 'Failed to mark correct for Team B');
    }
  };
  const handleUndo = async () => {
    try {
      await undoLast(sessionId);
      setErr(null);
    } catch (e) {
      setErr(e.message || 'Failed to undo last action');
    }
  };

  return (
    <div className="App" aria-busy={loading}>
      <main className="app-shell" role="main">
        {/* Top Bar with two timers */}
        <section className="topbar" aria-label="timers">
          <Timer
            label="Question"
            seconds={state.timers.questionRemaining}
            color="var(--color-primary)"
            ariaLabel="per-question timer"
          />
          <Timer
            label="Full Quiz"
            seconds={state.timers.quizRemaining}
            color="var(--color-success)"
            ariaLabel="full-quiz timer"
          />
        </section>

        {/* Central Question */}
        <section className="content">
          <QuestionCard
            title={state.question.title}
            body={state.question.body}
            answer={state.question.answer}
            answerRevealed={state.question.answerRevealed}
          />
        </section>

        {/* Bottom Scoreboard */}
        <section className="bottombar">
          <ScoreBoard teamA={state.scores.teamA} teamB={state.scores.teamB} />
        </section>

        {/* Right Control Panel */}
        <ControlPanel
          onPrev={handlePrev}
          onNext={handleNext}
          onReveal={handleReveal}
          onCorrectA={handleCorrectA}
          onCorrectB={handleCorrectB}
          onUndo={handleUndo}
          disabled={loading}
        />
      </main>

      {/* Loading/Error overlays */}
      <div className="visually-hidden" aria-live="polite">
        {loading ? 'Loading' : 'Loaded'}
        {err ? `Error: ${err}` : ''}
      </div>

      {err && (
        <div
          role="alert"
          style={{
            position: 'fixed', bottom: 16, left: 16, right: 16,
            background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
            borderRadius: 12, padding: 14, boxShadow: 'var(--shadow)', color: 'var(--color-error)', fontSize: 18, fontWeight: 700
          }}
        >
          {err}
        </div>
      )}

      {/* Celebration animation */}
      {celebrate && <div className="celebrate" aria-hidden="true">🎉</div>}
    </div>
  );
}

export default App;
