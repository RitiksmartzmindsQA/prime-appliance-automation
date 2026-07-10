import { test, expect } from '@playwright/test';
import { Sidebar } from '../../pages/sap/Sidebar';
import {sapJobId} from '../../test-data/sapJobId'

test('Complete portal workflow', async ({ page }) => {
  const sidebar = new Sidebar(page);

  await page.goto(process.env.SAP_URL);

  await expect(page.getByRole('heading', { name: 'Schedule Assist Portal' })).toBeVisible();

  await page.locator('#jobId').fill(sapJobId.jobId);

  await page.getByRole('button', { name: 'Search Job' }).click();

  await expect(page.getByRole('heading', { name: 'Schedule Assist Portal' })).toBeVisible();

  await page.getByRole('button', { name: '+ Add Technician' }).click();

  await expect(page.getByText('Technician 1 Skills:')).toBeVisible();

  await expect(page.locator('select[wire\\:model\\.live="technicians.0.id"]')).toBeVisible();

  await page.locator('select[wire\\:model\\.live="technicians.0.id"]').selectOption({ label: 'Harry Singh' });

  await expect(page.locator('#scheduleScroll-0')).toBeVisible();

  await page.getByText('Morning Window').first().click();

  await page.getByRole('button', { name: '+ Add Technician' }).click();

  await expect(page.locator('select[wire\\:model\\.live="technicians.1.id"]')).toBeVisible();

  await page.locator('select[wire\\:model\\.live="technicians.1.id"]').selectOption({ label: 'Nav Singh' });

  await expect(page.locator('#scheduleScroll-0')).toBeVisible();

  await page.getByText('Morning Window').first().click();

  await expect(page.getByRole('heading', { name: 'Ready to Schedule (2)' })).toBeVisible();

  await expect(page.locator('button[wire\\:click="removeTechnician(1)"]')).toBeVisible();

  await page.locator('button[wire\\:click="removeTechnician(1)"]').click();

  await expect(page.getByRole('heading', { name: 'Ready to Schedule (1)' })).toBeVisible();

  await sidebar.openSidebar.click();

  await sidebar.sapLogs.click();

  await expect(page.getByRole('heading', { name: 'SAP Logs' })).toBeVisible();

  await expect(page.locator('tbody tr').filter({ hasText: sapJobId.jobId }).first()).toContainText('laricegabba17@gmail.com');

});
