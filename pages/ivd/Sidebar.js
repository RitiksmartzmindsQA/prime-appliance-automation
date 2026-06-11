export class Sidebar {
  constructor(page) {
    this.page = page;

    this.sidebar = page.locator('#sidebar');

    this.openSidebar = page.locator('.toggle-sidebar-btn');

    this.idvPortal = this.sidebar.getByRole('link', { name: 'IDV Portal' });

    this.newIDV = this.sidebar.getByRole('link', { name: 'New IDV' });

    this.submittedIDV = this.sidebar.getByRole('link', { name: 'Submitted IDV' });

    this.completedIDV = this.sidebar.getByRole('link', { name: 'Completed IDV' });

    this.settings = this.sidebar.getByRole('link', { name: 'Settings' });

    this.youtubeLinks = this.sidebar.getByRole('link', { name: 'Youtube Links' });

    this.idvMails = this.sidebar.getByRole('link', { name: 'IDV Mails' });

    this.manageUser = this.sidebar.getByRole('link', { name: 'Manage User' });

    this.addUser = this.sidebar.getByRole('link', { name: 'Add User' });

    this.listUser = this.sidebar.getByRole('link', { name: 'List User' });

    this.apiDocumentation = this.sidebar.getByRole('link', { name: 'Api Documentation' });
  }
}
