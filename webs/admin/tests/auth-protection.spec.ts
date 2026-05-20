import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';
const AUTH_SERVICE_URL = 'http://localhost:3001';

// Helper to sign in via API
async function signInViaApi(page: any, email: string, password: string) {
  // First navigate to admin page to enable localStorage access
  await page.goto(`${BASE_URL}`);
  await page.waitForLoadState('domcontentloaded');

  const response = await page.request.post(`${AUTH_SERVICE_URL}/auth/v1/signin`, {
    data: { email, password },
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok()) {
    const data = await response.json();
    // Store tokens in localStorage to simulate the auth store behavior
    await page.evaluate(
      ({ access_token, refresh_token, user }) => {
        localStorage.setItem('admin_access_token', access_token);
        localStorage.setItem('admin_refresh_token', refresh_token);
        localStorage.setItem('admin_user', JSON.stringify(user));
      },
      data,
    );
    return true;
  }
  return false;
}

test.describe('Auth Protection - Unauthenticated', () => {
  test('unauthenticated user is redirected to /login when accessing dashboard', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
    await expect(page.locator('[data-testid="login-title"]')).toBeVisible();
  });

  test('unauthenticated user can access /login directly', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('[data-testid="login-title"]')).toBeVisible();
  });

  test('unauthenticated user is redirected when accessing /users', async ({ page }) => {
    await page.goto(`${BASE_URL}/users`);
    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  });

  test('unauthenticated user is redirected when accessing /organizations', async ({ page }) => {
    await page.goto(`${BASE_URL}/organizations`);
    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  });

  test('login page shows all form elements', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await expect(page.locator('[data-testid="login-email-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-password-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-submit-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-submit-button"]')).toHaveText('Sign In');
  });

  test('login page is clean without app chrome', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    // Should have login card
    await expect(page.locator('[data-testid="login-card"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-title"]')).toHaveText('Welcome back');
    await expect(page.locator('[data-testid="login-description"]')).toHaveText('Sign in to access the admin dashboard');

    // Should NOT have sidebar navigation (login layout is minimal)
    await expect(page.locator('aside')).not.toBeVisible();
    await expect(page.locator('nav')).not.toBeVisible();
    // Should NOT have header
    await expect(page.locator('header')).not.toBeVisible();
    // Should NOT have footer
    await expect(page.locator('footer')).not.toBeVisible();
  });
});

test.describe('Auth Flow - Sign In via API then Access Dashboard', () => {
  test('user can sign in and see dashboard with app chrome', async ({ page }) => {
    // Sign in via API and set localStorage
    const signedIn = await signInViaApi(page, 'test@example.com', 'Password123!');

    if (!signedIn) {
      // Skip if credentials don't exist - sign up first
      await page.request.post(`${AUTH_SERVICE_URL}/auth/v1/signup`, {
        data: {
          email: 'playwright-test@example.com',
          password: 'Password123!',
          first_name: 'Playwright',
          last_name: 'Test',
        },
        headers: { 'Content-Type': 'application/json' },
      });
      await signInViaApi(page, 'playwright-test@example.com', 'Password123!');
    }

    // Now navigate to dashboard - should stay on dashboard (authenticated)
    await page.goto(`${BASE_URL}/`);
    await expect(page).toHaveURL(`${BASE_URL}/`);

    // Should see dashboard with app chrome (sidebar, header)
    await expect(page.locator('[data-testid="app-layout"]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('aside')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();

    // Should NOT see login page elements
    await expect(page.locator('[data-testid="login-card"]')).not.toBeVisible();

    // Should see user greeting or dashboard content
    await expect(page.locator('text=Welcome back')).toBeVisible();
  });

  test('authenticated user is redirected away from /login to /', async ({ page }) => {
    // Sign in via API and set localStorage
    await signInViaApi(page, 'test@example.com', 'Password123!');

    // Navigate to /login - should be redirected to /
    await page.goto(`${BASE_URL}/login`);
    await expect(page).toHaveURL(`${BASE_URL}/`, { timeout: 5000 });

    // Should see dashboard
    await expect(page.locator('[data-testid="app-layout"]')).toBeVisible();
  });
});