# TV-facing Teacher Control UI (React)

This app provides a TV-friendly control interface for a classroom quiz, integrating with a Django backend via REST.

## Environment

Create a `.env` file in this folder based on `.env.example`:

- REACT_APP_API_BASE_URL: Base URL of the backend API (e.g., http://localhost:3001)

## Features

- Large central question card
- Top bar with per-question and full-quiz timers
- Bottom bar with Team A/B scores
- Right-side control panel: Previous, Next, Reveal Answer, Mark Correct (Team A), Mark Correct (Team B), Undo
- Confetti-style celebration animation when a correct answer is recorded
- Polls backend every 1.5s for current session state
- Light, modern theme with #3b82f6 (primary) and #06b6d4 (success)

## Scripts

- `npm start` — start dev server
- `npm test` — run tests
- `npm run build` — production build

## API

API client wrappers are in `src/api/client.js` and use `REACT_APP_API_BASE_URL`. Endpoints are placeholders to be implemented by the backend:

- GET `/api/quiz/state?session=...`
- POST `/api/quiz/previous`
- POST `/api/quiz/next`
- POST `/api/quiz/reveal`
- POST `/api/quiz/mark-correct` `{ session, team: 'A'|'B' }`
- POST `/api/quiz/undo` `{ session }`

These methods throw on HTTP error and return JSON on success.

## Accessibility

- Large touch-friendly controls
- aria-labels and live regions for timers and scores
- Focus rings for keyboard navigation
