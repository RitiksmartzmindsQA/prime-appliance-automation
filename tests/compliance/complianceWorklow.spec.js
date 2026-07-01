import { test, expect } from '@playwright/test';

import { Sidebar } from '../../pages/compliance/Sidebar';

test('Open compliance page', async ({ page }) => {

  const sidebar = new Sidebar(page);

  await page.goto(process.env.COMPLIANCE_URL);

  await sidebar.openSidebar.click();

  await sidebar.verificationOverview.click();

  await page.pause();
});
