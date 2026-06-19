import { test, expect } from '@playwright/test';
import { Sidebar } from "../../pages/b2b/Sidebar";
test ('Full portal workflow', async ({page}) => {
  const sidebar = new Sidebar(page);
  const today = new Date().toLocaleDateString('en-GB');

  await page.goto(process.env.B2B_URL);

  await sidebar.openSidebar.click();

  await sidebar.newBooking.click();

  await expect(page.getByRole('heading', { name: 'Our services' })).toBeVisible();

  await page.getByRole('link', { name: 'Select' }).first().click();

  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();

  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByRole('heading', { name: 'Appliance Information' })).toBeVisible();

  await page.getByPlaceholder('Enter Brand').fill('Test Brand');

  await page.getByPlaceholder('Enter Serial Number').fill('Test Serial Number');

  await page.getByPlaceholder('Enter Model Number').fill('Test Model Number');

  await page.getByPlaceholder('Enter Label for the appliance (e.g, D1, D10) if multiples in the area').fill('Test1 test2');

  await page.getByPlaceholder('Appliance Install Date').fill('2026-06-18');

  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();

  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByRole('heading', { name: 'Problem and Notes' })).toBeVisible();

  await page.getByPlaceholder('Problem Description').fill('Test Customer Problem Description');

  await page.getByPlaceholder('Description.....').fill('Test Description Test Description Test Description Test Description Test Description Test Description Test Description');

  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();

  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByRole('heading', { name: 'Customer Information' })).toBeVisible();

  await page.getByPlaceholder('B2B/Warranty Reference').fill('TEST-B2B-REFERENCE');

  await page.getByPlaceholder('Max Authorization Limit').fill('TEST Authorization Limit');

  await page.getByPlaceholder('Enter Your First Name').fill('Test First Name');

  await page.getByPlaceholder('Enter Your Last Name').fill('Test Last Name');

  await page.locator('#cell_phone').fill('4444444444');

  await page.locator('#secondary_phone').fill('5555555555');

  await page.getByPlaceholder('example***@gmail.com').fill('Test@gmail.com');

  await page.getByPlaceholder('Enter your address').fill('Test Address');

  await page.getByPlaceholder('Unit (Optional)').fill('Test Unit');

  await page.getByPlaceholder('Enter City').fill('Test City');

  await page.getByPlaceholder('Enter Province').fill('Test Province');

  await page.getByPlaceholder('Enter Postal Code').fill('Test Postal Code');

  await page.getByPlaceholder('Enter Country').fill('Test Country');

  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();

  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByRole('heading', { name: 'Please Confirm Details' })).toBeVisible();

  await expect(page.locator('#preview_company')).toHaveText('Prime Appliance');

  await expect(page.locator('#preview_b2b_reference')).toHaveText('TEST-B2B-REFERENCE');
  await expect(page.locator('#preview_username')).toHaveText('Test First Name Test Last Name');
  await expect(page.locator('#preview_phone')).toHaveText('444-444-4444');
  await expect(page.locator('#preview_secondary_phone')).toHaveText('555-555-5555');
  await expect(page.locator('#preview_email')).toHaveText('Test@gmail.com');
  await expect(page.locator('#preview_address')).toHaveText('Test Address, Test City, Test Province, Test Country');
  await expect(page.locator('#preview_zipcode')).toHaveText('Test Postal Code');
  await expect(page.locator('#preview_brand')).toHaveText('Test Brand');
  await expect(page.locator('#preview_product')).toHaveText('Electric Dryer');
  await expect(page.locator('#preview_model_no')).toHaveText('Test Model Number');
  await expect(page.locator('#preview_seial_no')).toHaveText('Test Serial Number');
  await expect(page.locator('#preview_install_date')).toHaveText('2026-06-18');
  await expect(page.locator('#preview_product_description')).toHaveText('Test Customer Problem Description');
  await expect(page.locator('#preview_description')).toHaveText('Test Description Test Description Test Description Test Description Test Description Test Description Test Description');
  await expect(page.getByText('Call Created On:').locator('..')).toContainText(today);
  await expect(page.getByText('Service:').locator('..')).toContainText('Electric Appliances - Closed Call Model');
  await expect(page.getByText('Item:').locator('..')).toContainText('Electric Dryer');
  await expect(page.getByText('Subtotal:').locator('..')).toContainText('$140.00');

  await expect(page.getByRole('button', { name: 'Confirm' })).toBeEnabled();

  await page.getByRole("button", { name: "Confirm" }).click();

  await expect(page.getByRole("heading", {name: "Congratulations!",})).toBeVisible();

  await expect(page.getByText("Booking created successfully"),).toBeVisible();

  await page.getByRole("button", {name: "OK",}).click();

  await sidebar.openSidebar.click();

  await sidebar.myBooking.click();

  await expect(page.getByRole('heading', { name: 'My Bookings' })).toBeVisible();

  await page.locator('tbody tr').filter({ hasText: 'Test First Name Test Last Name' }).locator('.text-dark').first().click();

  await expect(page.getByText('Company and Authorization Details')).toBeVisible();

  await expect(page.locator('#preview_company')).toHaveText('Prime Appliance');
  await expect(page.locator('#preview_b2b_reference')).toHaveText('TEST-B2B-REFERENCE');
  await expect(page.getByText('Prime B2C Panel Authorization').locator('..')).toContainText('SO-052');
  await expect(page.locator('#preview_authorization')).toHaveText('TEST Authorization Limit');
  await expect(page.locator('#preview_username')).toHaveText('Test First Name Test Last Name');
  await expect(page.locator('#preview_phone')).toHaveText('444-444-4444');
  await expect(page.locator('#preview_secondary_phone')).toHaveText('555-555-5555');
  await expect(page.locator('#preview_email')).toHaveText('Test@gmail.com');
  await expect(page.locator('#preview_zipcode')).toHaveText('Test Postal Code');
  await expect(page.locator('#preview_brand')).toHaveText('Test Brand');
  await expect(page.locator('#preview_product')).toHaveText('Electric Dryer');
  await expect(page.locator('#preview_seial_no')).toHaveText('Test Serial Number');
  await expect(page.locator('#preview_install_date')).toHaveText(today);
  await expect(page.locator('#preview_product_description')).toHaveText('Test Customer Problem Description');
  await expect(page.locator('#preview_description')).toHaveText('Test Description Test Description Test Description Test Description Test Description Test Description Test Description');
  await expect(page.getByText('Call Created On').locator('..')).toContainText('18/06/2026 05:44 PM');
  
});
