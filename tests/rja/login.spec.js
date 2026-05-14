import { test, expect } from '@playwright/test';

import { waitForPageLoad } from '../../utils/waitHelper.js';

test.use({
  storageState: 'auth/rja-auth.json'
});

test('RJA Dashboard Test', async ({ page }) => {

  await page.goto(process.env.RJA_URL);

  await waitForPageLoad(page);

  await expect(page).not.toHaveURL(/login/);

  await expect(
    page.getByText('Prime Appliance')
  ).toBeVisible();

});