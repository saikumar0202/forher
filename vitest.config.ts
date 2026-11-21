import { defineConfig } from 'vitest/config'

// Unit tests (pnpm test). Browser APIs like localStorage come from jsdom.
// Playwright end-to-end tests live in e2e/ and run with pnpm e2e.
export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
