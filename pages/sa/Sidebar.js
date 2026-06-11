export class Sidebar {
  constructor(page) {
    this.page = page;

    this.openSidebar = page.locator('.toggle-sidebar-btn');

    this.openPublicCoverageMap = page.getByRole('link', { name: '[UI] Public Coverage Map' });

    this.openPublicZipCode = page.getByRole('link', { name: '[UI] Public Zip/Postal Code' });
  }
}
