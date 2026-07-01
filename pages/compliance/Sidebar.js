export class Sidebar {
  constructor(page) {
    this.page = page;

    this.openSidebar = page.locator('.toggle-sidebar-btn');

    this.verificationOverview = page.getByRole('link', { name: 'Verification Overview' });

    this.profiles = page.getByRole('link', { name: 'Profiles' });

    this.licenses = page.getByRole('link', { name: 'Licenses' });

    this.insurances = page.getByRole('link', { name: 'Insurances' });

    this.governmentDocs = page.getByRole('link', { name: 'Government Docs' });

    this.paymentDocs = page.getByRole('link', { name: 'Payment Docs' });

    this.agreementDocs = page.getByRole('link', { name: 'Agreement Docs' });

    this.screenings = page.getByRole('link', { name: 'Screenings' });

    this.credentials = page.getByRole('link', { name: 'Credentials' });

    this.users = page.getByRole('link', { name: 'Users' });

    this.addUser = page.locator('#users-nav').getByRole('link', { name: 'Add User' });

    this.activeUsers = page.locator('#users-nav').getByRole('link', { name: 'Active Users' });

    this.deactivatedUsers = page.locator('#users-nav').getByRole('link', { name: 'Deactivated Users' });

    this.settings = page.getByRole('link', { name: 'Settings' });

    this.roles = page.locator('#settings-nav').getByRole('link', { name: 'Roles' });

    this.serviceCapabilities = page.locator('#settings-nav').getByRole('link', { name: 'Service Capabilities' });

    this.serviceAreaCodes = page.locator('#settings-nav').getByRole('link', { name: 'Service Area Codes' });

    this.expirations = page.locator('#settings-nav').getByRole('link', { name: 'Expirations' });

    this.autoReminders = page.locator('#settings-nav').getByRole('link', { name: 'Auto Reminders' });
  }
}
