export class Sidebar {
  constructor(page) {
    this.page = page;

    this.sidebar = page.locator('#sidebar');

    this.openSidebar = page.locator('.toggle-sidebar-btn');

    this.verificationOverview = this.sidebar.locator('a[href$="/overview"], a[href$="/overview/view"]');

    this.profiles = this.sidebar.locator('a[href$="/profiles"]');

    this.licenses = this.sidebar.locator('a[href$="/license"], a[href$="/license/current/overview"]');

    this.insurances = this.sidebar.locator('a[href$="/insurance"], a[href$="/insurance/current/overview"]');

    this.governmentDocs = this.sidebar.locator('a[href$="/government"], a[href$="/government/current/overview"]');

    this.paymentDocs = this.sidebar.locator('a[href$="/payment"], a[href$="/payment/current/overview"]');

    this.agreementDocs = this.sidebar.locator('a[href$="/agreement"], a[href$="/agreement/current/overview"]');

    this.screenings = this.sidebar.locator('a[href$="/screening"], a[href$="/screening/current/overview"]');
    
    this.credentials = this.sidebar.locator('a[href$="/credential"], a[href$="/credential/current/overview"]');

    this.users = this.sidebar.getByRole('link', {name: /Users/,});

    this.addUser = this.sidebar.locator('#users-nav').getByRole('link', { name: 'Add User' });

    this.activeUsers = this.sidebar.locator('#users-nav').getByRole('link', { name: 'Active Users' });

    this.deactivatedUsers = this.sidebar.locator('#users-nav').getByRole('link', { name: 'Deactivated Users' });

    this.settings = this.sidebar.getByRole('link', {name: /Settings/,});

    this.roles = this.sidebar.locator('#settings-nav').getByRole('link', { name: 'Roles' });

    this.serviceCapabilities = this.sidebar.locator('#settings-nav').getByRole('link', { name: 'Service Capabilities' });

    this.serviceAreaCodes = this.sidebar.locator('#settings-nav').getByRole('link', { name: 'Service Area Codes' });

    this.expirations = this.sidebar.locator('#settings-nav').getByRole('link', { name: 'Expirations' });

    this.autoReminders = this.sidebar.locator('#settings-nav').getByRole('link', { name: 'Auto Reminders' });
  }
}
