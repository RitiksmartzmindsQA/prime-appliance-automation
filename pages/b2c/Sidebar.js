export class Sidebar {
  constructor(page) {
    this.page = page;

    // OPEN SIDEBAR BUTTON

    this.openSidebar = page.locator('.toggle-sidebar-btn');

    //SIDEBAR

    this.sidebar = page.locator('aside');

    //MENU ITEMS

    this.newBooking = page.getByRole('link', { name: 'New Booking' });

    this.contactUs = page.getByRole('link', { name: 'Contact Us' });

    this.openingHours = page.getByRole('link', { name: 'Operating Hours' });
  }
}
