import '@testing-library/jest-dom'

// Mock IntersectionObserver which is not available in jsdom
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof IntersectionObserver
