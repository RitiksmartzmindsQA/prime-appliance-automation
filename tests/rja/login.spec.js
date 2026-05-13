import { test, expect } from '@playwright/test';

import { portals } from '../../configs/portalConfig.js';

test.use({
    storageState: 'auth/rja-auth.json'
});

test('RJA Dashboard Test', async ({ page }) => {

    await page.goto(portals.rja.url);

    await expect(
        page.locator('text=RJA Panel')
    ).toBeVisible();

});
