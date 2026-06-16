// pages/soi/Sidebar.js

export class Sidebar {
  constructor(page) {
    this.page = page;

    this.openSidebar = page.locator('.toggle-sidebar-btn');

    this.soiPortalMenu = page.getByRole('link', { 
      name: 'SOI Portal' 
    });

    this.newSOI = page.getByRole('link', { 
      name: 'New SOI' 
    });

    this.submittedSOI = page.getByRole('link', {
      name: 'Submitted SOI',
    });

    this.completedSOI = page.getByRole('link', {
      name: 'Completed SOI',
    });

    this.manageUsers = page.getByRole('link', {
      name: 'Manage User(s)',
    });

    this.settingsMenu = page.getByRole('link', {
      name: 'Settings',
    });

    this.expirations = page.getByRole('link', {
      name: 'Expiration(s)',
    });

    this.autoReminders = page.getByRole('link', {
      name: 'Auto Reminders(s)',
    });

    this.reviewLinks = page.getByRole('link', {
      name: 'Review Link(s)',
    });

    this.completeSOINotifications = page.getByRole('link', {
      name: 'Complete SOI Notifications',
    });

    this.apiDocumentation = page.getByRole('link', {
      name: 'API Documentation',
    });
  }
}
