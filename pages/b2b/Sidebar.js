export class Sidebar {
  constructor(page) {
    this.page = page;

    this.openSidebar = this.page.locator('.toggle-sidebar-btn');

    this.newBooking = this.page.getByRole('link', { name: 'New Booking' });
    this.myBooking = this.page.getByRole('link', { name: 'My Bookings' });

  }
}
