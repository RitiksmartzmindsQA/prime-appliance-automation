import { test, expect } from '@playwright/test';

test.use({
  storageState: 'auth/rja-auth.json'
});

test('RJA Dashboard Test', async ({ page }) => {

  await page.goto(process.env.RJA_URL);

  await page.waitForLoadState('networkidle');

  await expect(page).not.toHaveURL(/login/);

  await expect(
    page.getByText('Prime Appliance')
  ).toBeVisible();

});