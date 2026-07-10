import { test, expect } from '@playwright/test';

import { Sidebar } from '../../pages/sa/Sidebar.js';

test('Complete portal workflow', async ({ page }) => {
  const sidebar = new Sidebar(page);

  await page.goto(process.env.SA_URL);

  await expect(page.getByRole('heading', { name: 'Public Coverage Map' })).toBeVisible();

  await sidebar.openSidebar.click();

  await sidebar.openPublicZipCode.click();

  await expect(page.getByRole('heading', { name: 'Check Public Zip/Postal Code for Coverage' })).toBeVisible();

  await page.getByPlaceholder('Enter zip/postal codes').fill('M5S 1A1');

  await page.getByRole('button', { name: 'Check' }).click();

  await expect(page.getByText('Good news! We Cover this postal code')).toBeVisible();

  await page.getByPlaceholder('Enter zip/postal codes').fill('M5S 0A0');

  await page.getByRole('button', { name: 'Check' }).click();

  await expect(page.getByText("Unfortunately, we don't cover this postal code")).toBeVisible();
});
