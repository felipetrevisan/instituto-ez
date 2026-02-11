import '@testing-library/jest-dom/vitest'

if (typeof window !== 'undefined') {
  window.scrollTo = () => undefined
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
  class IntersectionObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver
}
