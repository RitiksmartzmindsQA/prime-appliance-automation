import { test, expect } from "@playwright/test";

import { Sidebar } from "../../pages/rja/Sidebar.js";

test.use({
  storageState: "auth/rja-auth.json",
});

test("Complete work flow", async ({ page }) => {
  const sidebar = new Sidebar(page);

  const companyName = `Test Company ${Date.now()}`;

  const companyEmail = `test${Date.now()}@gmail.com`;

  await page.goto(process.env.RJA_URL);

  // =========================
  // CREATE COMPANY
  // =========================

  await sidebar.main.click();

  await sidebar.settings.click();

  await sidebar.companyProfile.click();

  await expect(page.getByText("Add Company")).toBeVisible();

  await page.getByText("Add Company").click();

  await page.locator('[name="company_name"]').fill(companyName);

  await page.getByPlaceholder("Enter email").fill(companyEmail);

  await page
    .getByRole("button", {
      name: "Save",
    })
    .click();

  await expect(page.getByText("Company added successfully.")).toBeVisible();

  console.log("Company Created successfully");

  // =========================
  // NEW RJA FIRST
  // =========================

  await sidebar.main.click();

  await sidebar.rjaPanel.click();

  await sidebar.newRJA.click();

  await expect(
    page.getByRole("heading", {
      name: "Transmission Details",
    }),
  ).toBeVisible();

  await page.locator('select[wire\\:model="company_id"]').selectOption({
    label: companyName,
  });

  await expect(
    page.getByPlaceholder("Enter Maintenance Department Email"),
  ).toHaveValue(companyEmail);

  await page
    .getByPlaceholder("Enter B2B/Warranty Reference")
    .fill("Test Warranty Reference");

  await page.getByPlaceholder("write your comments.....").fill("Test Comment");

  await page.locator(".labour-cost").fill("10");

  await page.getByPlaceholder("I.e. W10821385").fill("ABC123");

  await page.locator(".parts-cost").fill("12");

  await page
    .getByRole("button", {
      name: "Send RJA to Maintenance Dept",
    })
    .click();

  // =========================
  // VERIFY SUBMITTED RJA
  // =========================

  await sidebar.main.click();

  await sidebar.rjaPanel.click();

  await sidebar.submittedRJA.click();

  await expect(
    page.getByRole("heading", { name: "Submitted RJA" }),
  ).toBeVisible();

  await expect(page.getByText(companyName)).toBeVisible();

  await page
    .locator("table tbody tr")
    .filter({
      hasText: companyName,
    })
    .locator("td:first-child a")
    .click();

  await expect(
    page.getByRole("heading", {
      name: "RJA Details",
    }),
  ).toBeVisible();

  await expect(page.locator(".form-select")).toContainText(companyName);

  await expect(
    page.locator(".form-control").filter({ hasText: companyEmail }),
  ).toBeVisible();

  await expect(
    page.locator(".card-body").getByText("Test Warranty Reference"),
  ).toBeVisible();

  await expect(
    page.locator(".card-body").getByText("Test Comment"),
  ).toBeVisible();

  await expect(page.locator("#labour-section .labour-cost")).toContainText(
    "10.00$",
  );

  await expect(page.locator("#parts-section")).toContainText("ABC123");

  await expect(page.locator("#parts-section .parts-cost")).toContainText(
    "12.00$",
  );

  console.log("Create RJA is working");

  await page
    .getByRole("button", {
      name: "Reject",
    })
    .click();

  // =========================
  // REJECT RJA FIRST
  // =========================

  await page.locator("#fname").fill("test");

  await page.locator('input[type="submit"][value="Reject"]').click();

  await expect(page.getByText("RJA rejected successfully.")).toBeVisible();

  await page.goto(process.env.RJA_URL);

  await expect(page).toHaveURL(process.env.RJA_URL);

  await sidebar.main.click();

  await sidebar.rjaPanel.click();

  await sidebar.deniedRJA.click();

  await expect(page.getByText(companyName)).toBeVisible();

  await expect(page.getByText(companyEmail)).toBeVisible();

  console.log("Denied RJA is working");

  // =========================
  // NEW RJA SECOND
  // =========================

  await sidebar.main.click();

  await sidebar.rjaPanel.click();

  await sidebar.newRJA.click();

  await expect(
    page.getByRole("heading", {
      name: "Transmission Details",
    }),
  ).toBeVisible();

  await page.locator('select[wire\\:model="company_id"]').selectOption({
    label: companyName,
  });

  await expect(
    page.getByPlaceholder("Enter Maintenance Department Email"),
  ).toHaveValue(companyEmail);

  await page
    .getByPlaceholder("Enter B2B/Warranty Reference")
    .fill("Test Warranty Reference");

  await page.getByPlaceholder("write your comments.....").fill("Test Comment");

  await page.locator(".labour-cost").fill("10");

  await page.getByPlaceholder("I.e. W10821385").fill("ABC123");

  await page.locator(".parts-cost").fill("12");

  await page
    .getByRole("button", {
      name: "Send RJA to Maintenance Dept",
    })
    .click();

  // VERIFY SECONG RJA

  await sidebar.main.click();

  await sidebar.rjaPanel.click();

  await sidebar.submittedRJA.click();

  await expect(
    page.getByRole("heading", { name: "Submitted RJA" }),
  ).toBeVisible();

  await expect(page.getByText(companyName)).toBeVisible();

  await page
    .locator("table tbody tr")
    .filter({
      hasText: companyName,
    })
    .locator("td:first-child a")
    .click();

  await expect(
    page.getByRole("heading", {
      name: "RJA Details",
    }),
  ).toBeVisible();

  await expect(page.locator(".form-select")).toContainText(companyName);

  await expect(
    page.locator(".form-control").filter({ hasText: companyEmail }),
  ).toBeVisible();

  await expect(
    page.locator(".card-body").getByText("Test Warranty Reference"),
  ).toBeVisible();

  await expect(
    page.locator(".card-body").getByText("Test Comment"),
  ).toBeVisible();

  await expect(page.locator("#labour-section .labour-cost")).toContainText(
    "10.00$",
  );

  await expect(page.locator("#parts-section")).toContainText("ABC123");

  await expect(page.locator("#parts-section .parts-cost")).toContainText(
    "12.00$",
  );

  await page
    .getByRole("button", {
      name: "Approve",
    })
    .click();

  // =========================
  // APPROVE RJA SECOND
  // =========================

  await page.locator("#fname").fill("test");

  await page.locator('input[type="submit"][value="Approve"]').click();

  await expect(page.getByText("RJA approved successfully.")).toBeVisible();

  await page.goto(process.env.RJA_URL);

  await expect(page).toHaveURL(process.env.RJA_URL);

  await sidebar.main.click();

  await sidebar.rjaPanel.click();

  await sidebar.approvedRJA.click();

  await expect(page.getByText(companyName)).toBeVisible();

  await expect(page.getByText(companyEmail)).toBeVisible();

  console.log("Approve RJA is working");
});
