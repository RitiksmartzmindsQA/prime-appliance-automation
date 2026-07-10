import { test, expect } from '@playwright/test';
import { Sidebar } from '../../pages/pricing/Sidebar';

test('Complete portal workflow', async ({ page }) => {
  const sidebar = new Sidebar(page);

  await page.goto(process.env.PRICING_URL);

  await sidebar.openSidebar.click();
  await expect(sidebar.pricingModelPortal).toBeVisible();
  await sidebar.pricingModelPortal.click();

  await expect(sidebar.minorRate).toBeVisible();
  await sidebar.minorRate.click();
  await expect(page.getByRole('heading', { name: 'Pricing Model Portal - Minor Rates' })).toBeVisible();
  await page.locator('.btn-outline-primary.btn-sm').first().click();
  await expect(page.getByRole('heading', { name: 'Pricing Model Portal - Detail(s)' })).toBeVisible();

  await sidebar.openSidebar.click();
  await expect(sidebar.pricingModelPortal).toBeVisible();
  await sidebar.pricingModelPortal.click();

  await expect(sidebar.majorRate).toBeVisible();
  await sidebar.majorRate.click();
  await expect(page.getByRole('heading', { name: 'Pricing Model Portal - Major Rates' })).toBeVisible();
  await page.locator('.btn-outline-primary.btn-sm').first().click();
  await expect(page.getByRole('heading', { name: 'Pricing Model Portal - Detail(s)' })).toBeVisible();

  await sidebar.openSidebar.click();
  await expect(sidebar.pricingModelPortal).toBeVisible();
  await sidebar.pricingModelPortal.click();

  await expect(sidebar.twoManRate).toBeVisible();
  await sidebar.twoManRate.click();
  await expect(page.getByRole('heading', { name: 'Pricing Model Portal - Two Man Rates' })).toBeVisible();
  await page.locator('.btn-outline-primary.btn-sm').first().click();
  await expect(page.getByRole('heading', { name: 'Pricing Model Portal - Detail(s)' })).toBeVisible();

  await sidebar.openSidebar.click();
  await expect(sidebar.pricingModelPortal).toBeVisible();
  await sidebar.pricingModelPortal.click();

  await expect(sidebar.sealedSystemRate).toBeVisible();
  await sidebar.sealedSystemRate.click();
  await expect(page.getByRole('heading', { name: 'Pricing Model Portal - Sealed System Rates' })).toBeVisible();
  await page.locator('.btn-outline-primary.btn-sm').first().click();
  await expect(page.getByRole('heading', { name: 'Pricing Model Portal - Detail(s)' })).toBeVisible();

  await sidebar.openSidebar.click();
  await expect(sidebar.pricingModelPortal).toBeVisible();
  await sidebar.pricingModelPortal.click();

  await expect(sidebar.partMarginPercentage).toBeVisible();
  await sidebar.partMarginPercentage.click();
  await expect(page.getByRole('heading', { name: 'Pricing Model Portal - Part Margin Percentages' })).toBeVisible();
  await page.locator('.btn-outline-primary.btn-sm').first().click();
  await expect(page.getByRole('heading', { name: 'Pricing Model Portal - Detail(s)' })).toBeVisible();

  await sidebar.openSidebar.click();
  await expect(sidebar.pricingModelPortal).toBeVisible();
  await sidebar.pricingModelPortal.click();

  await expect(sidebar.shippingCost).toBeVisible();
  await sidebar.shippingCost.click();
  await expect(page.getByRole('heading', { name: 'Pricing Model Portal - Shipping Costs' })).toBeVisible();
  await page.locator('.btn-outline-primary.btn-sm').first().click();
  await expect(page.getByRole('heading', { name: 'Pricing Model Portal - Detail(s)' })).toBeVisible();

  await sidebar.openSidebar.click();
  await expect(sidebar.pricingModelPortal).toBeVisible();
  await sidebar.pricingModelPortal.click();

  await expect(sidebar.rmaCost).toBeVisible();
  await sidebar.rmaCost.click();
  await expect(page.getByRole('heading', { name: 'Pricing Model Portal - RMA Costs' })).toBeVisible();
  await page.locator('.btn-outline-primary.btn-sm').first().click();
  await expect(page.getByRole('heading', { name: 'Pricing Model Portal - Detail(s)' })).toBeVisible();

  // await sidebar.openSidebar.click();
  // await sidebar.pricingModelPortal.click();

  // await sidebar.mileageRate.click();
  // await expect(page.getByRole('heading', { name: 'Pricing Model Portal - Mileage Rates' })).toBeVisible();
  // await page.locator('.btn-outline-primary.btn-sm').first().click();

  await sidebar.openSidebar.click();

  await expect(sidebar.manageUsers).toBeVisible();
  await sidebar.manageUsers.click();
  await expect(page.getByRole('heading', { name: 'Manage Users' })).toBeVisible();

  await sidebar.openSidebar.click();
  await expect(sidebar.settings).toBeVisible();
  await sidebar.settings.click();

  await expect(sidebar.profileType).toBeVisible();
  await sidebar.profileType.click();
  await expect(page.getByRole('heading', { name: 'Profile Types' })).toBeVisible();

  await sidebar.openSidebar.click();
  await expect(sidebar.settings).toBeVisible();
  await sidebar.settings.click();
  
  await expect(sidebar.rateType).toBeVisible();
  await sidebar.rateType.click();
  await expect(page.getByRole('heading', { name: 'Rate Types' })).toBeVisible();

});