/** biome-ignore-all lint/suspicious/noExplicitAny: these are mocks */
/** biome-ignore-all lint/correctness/noUndeclaredVariables: these are mocks */
/** biome-ignore-all lint/complexity/noArguments: these are mocks */
/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: these are mocks */
/** biome-ignore-all lint/complexity/noUselessConstructor: these are mocks */
import "@testing-library/jest-dom"
import React from "react"
import { afterEach, beforeEach, expect, vi } from "vitest"

// Extend Vitest's expect with custom matchers
expect.extend({
  toBeVisible(received) {
    const isVisible =
      received.style.display !== "none" &&
      received.style.visibility !== "hidden" &&
      !received.classList.contains("opacity-0") &&
      !received.classList.contains("invisible")

    return {
      message: () => `expected element to ${isVisible ? "not " : ""}be visible`,
      pass: isVisible,
    }
  },

  toHaveAccessibleName(received, expectedName) {
    const ariaLabel = received.getAttribute("aria-label")
    const title = received.getAttribute("title")
    const textContent = received.textContent

    const accessibleName = ariaLabel || title || textContent || ""
    const pass = accessibleName.includes(expectedName)

    return {
      message: () =>
        `expected element to have accessible name containing "${expectedName}", but got "${accessibleName}"`,
      pass,
    }
  },

  toHaveMinimumTouchTarget(received) {
    const rect = received.getBoundingClientRect()
    const minSize = 44 // WCAG minimum touch target size

    const pass = rect.width >= minSize && rect.height >= minSize

    return {
      message: () =>
        `expected element to have minimum touch target size of ${minSize}px, but got ${rect.width}x${rect.height}`,
      pass,
    }
  },

  toHaveProperFocusIndicator(received) {
    const computedStyle = window.getComputedStyle(received)
    const outline = computedStyle.outline
    const outlineWidth = computedStyle.outlineWidth
    const boxShadow = computedStyle.boxShadow

    // Check for visible focus indicator
    const hasOutline = outline !== "none" && outlineWidth !== "0px"
    const hasBoxShadow = boxShadow !== "none"
    const hasFocusClasses =
      received.classList.contains("focus:ring-4") ||
      received.classList.contains("focus:outline-none")

    const pass = hasOutline || hasBoxShadow || hasFocusClasses

    return {
      message: () => "expected element to have proper focus indicator",
      pass,
    }
  },
})

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}))

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => {
    return React.createElement("img", { src, alt, ...props })
  },
}))

// Mock DOM APIs
global.IntersectionObserver = class IntersectionObserver {
  root = null
  rootMargin = ""
  thresholds = []

  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// Mock scrollTo
Object.defineProperty(window, "scrollTo", {
  writable: true,
  // biome-ignore lint/complexity/useArrowFunction: arguments are only available in "old-school" functions
  value: function (coords: { top?: number; behavior?: string } | number, _y?: number) {
    let targetY = typeof coords === "number" ? coords : coords.top
    targetY ??= typeof arguments[0] === "number" ? arguments[0] : 0

    window.scrollY = targetY
  },
})

// Mock scrollY
Object.defineProperty(window, "scrollY", {
  writable: true,
  value: 0,
})

// Mock localStorage with actual storage functionality
const localStorageStore: Record<string, string> = {}

const localStorageMock = {
  getItem: vi.fn((key: string) => localStorageStore[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    localStorageStore[key] = value
  }),
  removeItem: vi.fn((key: string) => {
    delete localStorageStore[key]
  }),
  clear: vi.fn(() => {
    Object.keys(localStorageStore).forEach(key => delete localStorageStore[key])
  }),
  length: 0,
  key: vi.fn((_index: number) => null),
}

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
  configurable: true,
})

// Setup before each test
beforeEach(() => {
  // Reset scroll position
  window.scrollY = 0

  // Reset localStorage store
  Object.keys(localStorageStore).forEach(key => delete localStorageStore[key])

  // Clear localStorage mock call history
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
  localStorageMock.clear.mockClear()
})

// Clean up after each test
afterEach(() => {
  // Reset any global state
  Object.keys(localStorageStore).forEach(key => delete localStorageStore[key])
  window.scrollY = 0

  // Clear all mocks
  vi.clearAllMocks()
})
