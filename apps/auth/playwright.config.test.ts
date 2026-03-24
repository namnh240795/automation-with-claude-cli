import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Auth Service E2E tests
 * Tests OAuth 2.0 authorization flows
 *
 * This config is for testing against an already running server
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Run tests sequentially to avoid database conflicts
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Single worker to avoid database state conflicts
  reporter: [
    ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // No webServer - expect server to be already running
});
