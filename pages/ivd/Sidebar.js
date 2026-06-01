export class Sidebar {

    constructor(page) {

        this.page = page;

        this.sidebar =page.locator("#sidebar");

        this.openSidebar =page.locator(".toggle-sidebar-btn");
        
        this.idvPortal =page.getByRole("link", { name: "IDV Portal" });

        this.newIDV =page.getByRole("link", { name: "New IDV" });

        this.submittedIDV =page.getByRole("link", { name: "Submitted IDV" });

        this.completedIDV =page.getByRole("link", { name: "Completed IDV" });

        this.settings =page.getByRole("link", { name: "Settings" });

        this.youtubeLinks =page.getByRole("link", { name: "Youtube Links" });

        this.idvMails =page.getByRole("link", { name: "IDV Mails" });

        this.manageUser =page.getByRole("link", { name: "Manage User" });

        this.addUser =page.getByRole("link", { name: "Add User" });

        this.listUser =page.getByRole("link", { name: "List User" });

        this.apiDocumentation =page.getByRole("link", { name: "Api Documentation" });

    }

}