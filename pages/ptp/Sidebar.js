export class Sidebar {
  constructor(page) {
    this.page = page;

    this.openSidebar = page.locator('.toggle-sidebar-btn');

    this.sidebar = page.locator('#sidebar');

    this.ptpPortal = page.locator('a[href*="ptp-portal"]');

    this.ptpLogs = page.locator('a[href*="ptp-logs"]');

    this.settings = page.locator('a[href="#submenu-settings"]');

    this.progressBarSetting = page.locator('a[href*="progress-bar"]');

    this.googleCloudUrlPool = page.locator('a[href*="google-cloud-url-pool"]');
  }
}
