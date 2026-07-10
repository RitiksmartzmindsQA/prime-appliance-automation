export class Sidebar {
  constructor(page) {
    this.page = page;

    this.openSidebar = page.locator('.toggle-sidebar-btn');

    this.pricingModelPortal = page.locator('a[href="#submenu-pricing-model-portal"]');

    this.settings = page.locator('a[href="#submenu-settings"]');

    this.profiles = page.locator('a[href="#submenu-profiles"]');

    this.apiDocumentation = page.locator('a[href="#submenu-api-documentation"]');

    this.minorRate = page.getByRole('link', { name: 'Minor Rate' });

    this.majorRate = page.getByRole('link', { name: 'Major Rate' });

    this.twoManRate = page.getByRole('link', { name: 'Two Man Rate' });

    this.sealedSystemRate = page.getByRole('link', { name: 'Sealed System Rate' });

    this.partMarginPercentage = page.getByRole('link', { name: 'Part Margin Percentage' });

    this.shippingCost = page.getByRole('link', { name: 'Shipping Cost' });

    this.rmaCost = page.getByRole('link', { name: 'RMA Cost' });

    this.mileageRate = page.getByRole('link', { name: 'Mileage Rate' });

    this.manageUsers = page.getByRole('link', { name: 'Manage User(s)' });

    this.profileType = page.getByRole('link', { name: 'Profile Type' });

    this.rateType = page.getByRole('link', { name: 'Rate Type' });

  }
}
