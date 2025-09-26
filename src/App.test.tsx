import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Basic smoke test: renders the app and shows brand or navigation
test('renders AgriSeva brand', () => {
  render(<App />);
  const brands = screen.getAllByText(/AgriSeva/i);
  expect(brands.length).toBeGreaterThan(0);
});
