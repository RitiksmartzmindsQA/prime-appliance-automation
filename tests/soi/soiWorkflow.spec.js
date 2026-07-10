import { test, expect } from '@playwright/test';

import { Sidebar } from '../../pages/soi/Sidebar.js';

test('Complete portal workflow', async ({ page }) => {
  const sidebar = new Sidebar(page);

  await page.goto(process.env.SOI_URL.replace('/login', ''));

  await sidebar.openSidebar.click();

  await sidebar.soiPortalMenu.click();

  await sidebar.newSOI.click();

  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('heading', { name: 'Service Outcome Inquiry Details' })).toBeVisible();

  await page.getByPlaceholder('Prime Job UUID:').click();
  await page.getByPlaceholder('Prime Job UUID:').pressSequentially('Test Prime Job UUID', { delay: 50 });

  await page.getByPlaceholder('Prime Invoice:').click();
  await page.getByPlaceholder('Prime Invoice:').pressSequentially('Test Prime Invoice', { delay: 50 });

  await page.getByPlaceholder('B2B/Warranty Reference:').click();
  await page.getByPlaceholder('B2B/Warranty Reference:').pressSequentially('Test B2B/Warranty Reference', { delay: 50 });

  await page.getByPlaceholder('Product:').click();
  await page.getByPlaceholder('Product:').pressSequentially('Test Product', { delay: 50 });

  await page.getByPlaceholder('Brand:').click();
  await page.getByPlaceholder('Brand:').pressSequentially('Test Brand', { delay: 50 });

  await page.getByPlaceholder('Customer Name:').click();
  await page.getByPlaceholder('Customer Name:').pressSequentially('Test Customer Name', { delay: 50 });

  await page.getByRole('textbox', { name: '(000) 000-' }).first().click();
  await page.getByRole('textbox', { name: '(000) 000-' }).first().pressSequentially('4444444444', { delay: 50 });

  await page.getByPlaceholder('Customer Email:').click();
  await page.getByPlaceholder('Customer Email:').pressSequentially('Test@gmail.com', { delay: 50 });

  await page.getByPlaceholder('Address:').click();
  await page.getByPlaceholder('Address:').pressSequentially('Test Address', { delay: 50 });

  await page.getByPlaceholder('Unit (Optional):').click();
  await page.getByPlaceholder('Unit (Optional):').pressSequentially('Test Unit (Optional)', { delay: 50 });

  await page.getByPlaceholder('City:').click();
  await page.getByPlaceholder('City:').pressSequentially('Test City', { delay: 50 });

  await page.getByPlaceholder('Province/ State:').click();
  await page.getByPlaceholder('Province/ State:').pressSequentially('Test Province/ State', { delay: 50 });

  await page.getByPlaceholder('Enter ZIP/Postal Code').click();
  await page.getByPlaceholder('Enter ZIP/Postal Code').pressSequentially('T1F 2T3', { delay: 50 });

  await page.getByPlaceholder('Country:').click();
  await page.getByPlaceholder('Country:').pressSequentially('Test Country', { delay: 50 });

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('SOI has been created successfully.')).toBeVisible();

  await sidebar.openSidebar.click();

  await sidebar.soiPortalMenu.click();

  await sidebar.submittedSOI.click();

  await page.locator('tbody tr').filter({ hasText: 'Test Prime Invoice' }).locator('a[href*="/soi/"]').first().click();

  await expect(page.getByRole('heading', { name: 'Thank you for choosing Prime Appliance Repairs! Was your appliance issue fully resolved? Let us know below!' })).toBeVisible();

  await page.getByRole('button', { name: 'Issue Was Resolved' }).click();

  await expect(page.getByRole('heading', { name: 'Submitted Service Outcome Inquiry' })).toBeVisible();

  await page.locator('[data-rating="resolution_timeliness"] [data-value="4"]').click();

  await page.locator('[data-rating="ease_of_process"] [data-value="5"]').click();

  await page.locator('[data-rating="quality_of_service"] [data-value="3"]').click();

  await page.locator('[data-rating="overall_satisfaction"] [data-value="5"]').click();

  await page.getByRole('button', { name: 'Submit Response' }).click();

  await Promise.all([page.context().waitForEvent('page'), page.getByRole('button', { name: 'Rate us on Google' }).click()]);

  await expect(page.context().pages()[1]).toHaveURL(/google/i);
});

  test('Not Resolved SOI Flow - Same issue', async ({ page }) => {
  const sidebar = new Sidebar(page);

  await page.goto(process.env.SOI_URL.replace('/login', ''));
  
  await sidebar.openSidebar.click();

  await sidebar.soiPortalMenu.click();

  await sidebar.newSOI.click();

  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('heading', { name: 'Service Outcome Inquiry Details' })).toBeVisible();

  await page.getByPlaceholder('Prime Job UUID:').click();
  await page.getByPlaceholder('Prime Job UUID:').pressSequentially('Test Prime Job UUID', { delay: 50 });

  await page.getByPlaceholder('Prime Invoice:').click();
  await page.getByPlaceholder('Prime Invoice:').pressSequentially('Test Prime Invoice', { delay: 50 });

  await page.getByPlaceholder('B2B/Warranty Reference:').click();
  await page.getByPlaceholder('B2B/Warranty Reference:').pressSequentially('Test B2B/Warranty Reference', { delay: 50 });

  await page.getByPlaceholder('Product:').click();
  await page.getByPlaceholder('Product:').pressSequentially('Test Product', { delay: 50 });

  await page.getByPlaceholder('Brand:').click();
  await page.getByPlaceholder('Brand:').pressSequentially('Test Brand', { delay: 50 });

  await page.getByPlaceholder('Customer Name:').click();
  await page.getByPlaceholder('Customer Name:').pressSequentially('Test Customer Name', { delay: 50 });

  await page.getByRole('textbox', { name: '(000) 000-' }).first().click();
  await page.getByRole('textbox', { name: '(000) 000-' }).first().pressSequentially('4444444444', { delay: 50 });

  await page.getByPlaceholder('Customer Email:').click();
  await page.getByPlaceholder('Customer Email:').pressSequentially('Test@gmail.com', { delay: 50 });

  await page.getByPlaceholder('Address:').click();
  await page.getByPlaceholder('Address:').pressSequentially('Test Address', { delay: 50 });

  await page.getByPlaceholder('Unit (Optional):').click();
  await page.getByPlaceholder('Unit (Optional):').pressSequentially('Test Unit (Optional)', { delay: 50 });

  await page.getByPlaceholder('City:').click();
  await page.getByPlaceholder('City:').pressSequentially('Test City', { delay: 50 });

  await page.getByPlaceholder('Province/ State:').click();
  await page.getByPlaceholder('Province/ State:').pressSequentially('Test Province/ State', { delay: 50 });

  await page.getByPlaceholder('Enter ZIP/Postal Code').click();
  await page.getByPlaceholder('Enter ZIP/Postal Code').pressSequentially('T1F 2T3', { delay: 50 });

  await page.getByPlaceholder('Country:').click();
  await page.getByPlaceholder('Country:').pressSequentially('Test Country', { delay: 50 });

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('SOI has been created successfully.')).toBeVisible();

  await sidebar.openSidebar.click();

  await sidebar.soiPortalMenu.click();

  await sidebar.submittedSOI.click();

  await page.locator('tbody tr').filter({ hasText: 'Test Prime Invoice' }).locator('a[href*="/soi/"]').first().click();

  await expect(page.getByRole('heading', { name: 'Thank you for choosing Prime Appliance Repairs! Was your appliance issue fully resolved? Let us know below!' })).toBeVisible();

  await page.getByRole('button', { name: 'Issue Was Not Resolved' }).click();

  await expect(page.getByRole('heading', { name: 'Submitted Service Outcome Inquiry' })).toBeVisible();

  await page.getByRole('button', { name: 'Yes, its the same issue' }).click();

  await expect(page.getByRole('heading', { name: 'Submitted Service Outcome Inquiry' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Please provide additional' }).click();
  await page.getByRole('textbox', { name: 'Please provide additional' }).pressSequentially('Test Additional Details', { delay: 50 });

  await page.locator('#sameIssueAttachment').setInputFiles('assets/images/878-100x100.jpg');

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByRole('heading', { name: 'Thank You!' })).toBeVisible();

  await page.getByRole('button', { name: 'Continue' }).click();

});

  test('Not Resolved SOI Flow - Different issue', async ({ page }) => {
  const sidebar = new Sidebar(page);

  await page.goto(process.env.SOI_URL.replace('/login', ''));
  
  await sidebar.openSidebar.click();

  await sidebar.soiPortalMenu.click();

  await sidebar.newSOI.click();

  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('heading', { name: 'Service Outcome Inquiry Details' })).toBeVisible();

  await page.getByPlaceholder('Prime Job UUID:').click();
  await page.getByPlaceholder('Prime Job UUID:').pressSequentially('Test Prime Job UUID', { delay: 50 });

  await page.getByPlaceholder('Prime Invoice:').click();
  await page.getByPlaceholder('Prime Invoice:').pressSequentially('Test Prime Invoice', { delay: 50 });

  await page.getByPlaceholder('B2B/Warranty Reference:').click();
  await page.getByPlaceholder('B2B/Warranty Reference:').pressSequentially('Test B2B/Warranty Reference', { delay: 50 });

  await page.getByPlaceholder('Product:').click();
  await page.getByPlaceholder('Product:').pressSequentially('Test Product', { delay: 50 });

  await page.getByPlaceholder('Brand:').click();
  await page.getByPlaceholder('Brand:').pressSequentially('Test Brand', { delay: 50 });

  await page.getByPlaceholder('Customer Name:').click();
  await page.getByPlaceholder('Customer Name:').pressSequentially('Test Customer Name', { delay: 50 });

  await page.getByRole('textbox', { name: '(000) 000-' }).first().click();
  await page.getByRole('textbox', { name: '(000) 000-' }).first().pressSequentially('4444444444', { delay: 50 });

  await page.getByPlaceholder('Customer Email:').click();
  await page.getByPlaceholder('Customer Email:').pressSequentially('Test@gmail.com', { delay: 50 });

  await page.getByPlaceholder('Address:').click();
  await page.getByPlaceholder('Address:').pressSequentially('Test Address', { delay: 50 });

  await page.getByPlaceholder('Unit (Optional):').click();
  await page.getByPlaceholder('Unit (Optional):').pressSequentially('Test Unit (Optional)', { delay: 50 });

  await page.getByPlaceholder('City:').click();
  await page.getByPlaceholder('City:').pressSequentially('Test City', { delay: 50 });

  await page.getByPlaceholder('Province/ State:').click();
  await page.getByPlaceholder('Province/ State:').pressSequentially('Test Province/ State', { delay: 50 });

  await page.getByPlaceholder('Enter ZIP/Postal Code').click();
  await page.getByPlaceholder('Enter ZIP/Postal Code').pressSequentially('T1F 2T3', { delay: 50 });

  await page.getByPlaceholder('Country:').click();
  await page.getByPlaceholder('Country:').pressSequentially('Test Country', { delay: 50 });

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('SOI has been created successfully.')).toBeVisible();

  await sidebar.openSidebar.click();

  await sidebar.soiPortalMenu.click();

  await sidebar.submittedSOI.click();

  await page.locator('tbody tr').filter({ hasText: 'Test Prime Invoice' }).locator('a[href*="/soi/"]').first().click();

  await expect(page.getByRole('heading', { name: 'Thank you for choosing Prime Appliance Repairs! Was your appliance issue fully resolved? Let us know below!' })).toBeVisible();

  await page.getByRole('button', { name: 'Issue Was Not Resolved' }).click();

  await expect(page.getByRole('heading', { name: 'Submitted Service Outcome Inquiry' })).toBeVisible();

  await page.getByRole('button', { name: 'No, different issue' }).click();

  await expect(page.getByRole('heading', { name: 'Submitted Service Outcome Inquiry' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Describe the new issue you are experiencing' }).click();
  await page.getByRole('textbox', { name: 'Describe the new issue you are experiencing' }).pressSequentially('Test Additional Details', { delay: 50 });

  await page.locator('#sameIssueAttachment').setInputFiles('assets/images/878-100x100.jpg');

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByRole('heading', { name: 'Thank You!' })).toBeVisible();

  await page.getByRole('button', { name: 'Stay Here' }).click();

});
