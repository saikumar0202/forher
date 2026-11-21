import { defineConfig, devices } from '@playwright/test'

// End-to-end tests (pnpm e2e).
// In CI the pipeline sets E2E_BASE_URL to the Vercel preview and
// VERCEL_AUTOMATION_BYPASS_SECRET for protected previews. Locally, with no
// E2E_BASE_URL, Playwright builds the app and serves it with vite preview.
const baseURL = process.env.E2E_BASE_URL
const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET

export default defineConfig({
  testDir: 'e2e',
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: baseURL ?? 'http://localhost:4173',
    extraHTTPHeaders: bypass
      ? { 'x-vercel-protection-bypass': bypass, 'x-vercel-set-bypass-cookie': 'true' }
      : undefined,
    screenshot: 'on',
    trace: 'off',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: baseURL
    ? undefined
    : {
        command: 'pnpm build && pnpm preview --port 4173 --strictPort',
        url: 'http://localhost:4173',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
})
