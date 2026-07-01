export class Sidebar {
    constructor(page){
        this.page = page;

        this.openSidebar = page.locator('.toggle-sidebar-btn');

        this.sapPortal = page.getByRole('link', { name: 'SAP Portal' });

        this.sapLogs = page.getByRole('link', { name: 'SAP Logs' });

        this.manageUsers = page.getByRole('link', { name: 'Manage Users' });

        this.settings = page.getByRole('link', { name: 'Settings' });
        

    }
}