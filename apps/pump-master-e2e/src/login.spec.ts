import { test, expect } from '@playwright/test';

const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL || 'atester.lee@gmail.com';
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD || '1234567';

// The login form uses 'username' as the field name, but expects an email for the backend

test.describe('Login Page', () => {
  test('successful login redirects to home', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'username' }).fill(TEST_USER_EMAIL);
    await page
      .getByRole('textbox', { name: 'password' })
      .fill(TEST_USER_PASSWORD);
    await page.getByRole('button', { name: /log in/i }).click();

    // Wait for redirect or home page content
    await page.waitForURL('/');
    // Optionally, check for a welcome message on dashboard
    await expect(
      page.getByRole('heading', { name: 'Welcome! You are logged in.' })
    ).toBeVisible();
  });

  test('shows error on invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page
      .getByRole('textbox', { name: 'username' })
      .fill('wrong@example.com');
    await page.getByRole('textbox', { name: 'password' }).fill('wrongpassword');
    await page.getByRole('button', { name: /log in/i }).click();

    // Should show an error message
    await expect(page.locator('.alert-danger')).toContainText('Invalid');
  });
});
