import { expect, test } from '@playwright/test'

test('home page loads past the loading screen', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('AnnoyHer.exe')
  // While loading, the loading screen's h1 sits on top of the dashboard's.
  // When it finishes and unmounts, only the dashboard heading is left.
  const headings = page.getByRole('heading', { level: 1 })
  await expect(headings).toHaveCount(1, { timeout: 10_000 })
  await expect(headings).toHaveText(/Everything appears to be\s*working normally\./)
  await expect(page.getByText('Active modules.')).toBeVisible()
})
