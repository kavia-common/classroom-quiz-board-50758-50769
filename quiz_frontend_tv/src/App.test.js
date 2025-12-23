import { render, screen } from '@testing-library/react';
import App from './App';

test('renders timers and control panel', () => {
  render(<App />);
  expect(screen.getByLabelText(/per-question timer/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/full-quiz timer/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/control panel/i)).toBeInTheDocument();
});
