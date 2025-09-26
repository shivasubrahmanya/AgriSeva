// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock localforage with an in-memory store to avoid storage errors in jsdom
jest.mock('localforage', () => {
  const store: Record<string, any> = {};
  return {
    config: jest.fn(),
    getItem: jest.fn(async (k: string) => (k in store ? store[k] : null)),
    setItem: jest.fn(async (k: string, v: any) => { store[k] = v; return v; }),
    removeItem: jest.fn(async (k: string) => { delete store[k]; }),
    clear: jest.fn(async () => { Object.keys(store).forEach((k) => delete store[k]); }),
    INDEXEDDB: 'indexeddb',
  };
});

// Basic mocks for browser APIs used in components
globalThis.matchMedia = globalThis.matchMedia || ((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(() => false),
} as any));

// Speech APIs no-op in tests
(Object.assign(window, {
  SpeechRecognition: undefined,
  webkitSpeechRecognition: undefined,
}))
