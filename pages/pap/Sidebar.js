export class Sidebar {
  constructor(page) {
    this.page = page;

    this.papLogs = page.locator('a[href*="pap-logs"]');

    this.manageUsers = page.locator('a[href="#submenu-users"]');

    this.activeUsers = page.locator('a[href*="active-user"]');

    this.inactiveUsers = page.locator('a[href*="inactive-user"]');

    this.settings = page.locator('a[href="#submenu-settings"]');

    this.googleCloudUrlPool = page.locator('a[href*="google-cloud-url-pool"]');
  }
}
