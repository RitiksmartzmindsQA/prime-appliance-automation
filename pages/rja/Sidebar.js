// pages/sidebar.js

export class Sidebar {
  constructor(page) {
    this.page = page;

    this.sidebar = page.locator("#sidebar");

    // =========================
    // RJA PANEL
    // =========================
    this.main = this.sidebar.getByRole("link", {
      name: "Main",
    });

    this.rjaPanel = this.sidebar.getByRole("link", {
      name: /RJA Panel/,
    });

    this.newRJA = this.sidebar.getByRole("link", {
      name: "New RJA",
    });

    this.submittedRJA = this.sidebar.getByRole("link", {
      name: "Submitted RJA",
    });

    this.approvedRJA = this.sidebar.getByRole("link", {
      name: "Approved RJA",
    });

    this.deniedRJA = this.sidebar.getByRole("link", {
      name: "Denied RJA",
    });

    // =========================
    // SETTINGS
    // =========================

    this.settings = this.sidebar.getByRole("link", {
      name: /Settings/,
    });

    this.companyProfile = this.sidebar.getByRole("link", {
      name: "Company Profile",
    });
  }
}
