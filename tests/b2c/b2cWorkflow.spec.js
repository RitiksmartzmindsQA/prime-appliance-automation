import { test, expect } from "@playwright/test";

import { Sidebar } from "../../pages/b2c/Sidebar.js";

test("Complete Workflow ", async ({ page }) => 

  {const sidebar = new Sidebar(page);

  await page.goto(process.env.B2C_URL);

  await sidebar.openSidebar.click();

  await sidebar.newBooking.click();

  await expect(page.getByRole("heading", { name: "Our services" })).toBeVisible();

  await page.getByRole("link", { name: "Select" }).first().click();

  await expect(page.getByRole("button", { name: "Next" })).toBeEnabled();

  await page.getByRole("button", { name: "Next" }).click();

  await expect(page.getByRole("heading", { name: "Appliance Information" })).toBeVisible();

  await page.getByPlaceholder("Enter Brand").fill("Test Brand");

  await expect(page.getByRole("button", { name: "Next" })).toBeEnabled();

  await page.getByRole("button", { name: "Next" }).click();

  await expect(page.getByRole("heading", { name: "Problem and Notes" })).toBeVisible();

  await page.getByPlaceholder("Problem Description").fill("Test Customer Problem Description");

  await expect(page.getByRole("button", { name: "Next" })).toBeEnabled();

  await page.getByRole("button", { name: "Next" }).click();

  await expect(page.getByRole("heading", {name: "Customer Information",})).toBeVisible();

  await page.getByPlaceholder("Enter Your First Name").fill("Test First Name");

  await page.getByPlaceholder("Enter Your Last Name").fill("Test Last Name");

  await page.locator("#cell_phone").fill("4444444444");

  await page.locator("#secondary_phone").fill("5555555555");

  await page.getByPlaceholder("example***@gmail.com").fill("Test@gmail.com");

  await page.getByPlaceholder("Enter your address").fill("Test Address");

  await page.getByPlaceholder("Unit (Optional)").fill("Test Unit");

  await page.getByPlaceholder("Enter City").fill("Test City");

  await page.getByPlaceholder("Enter Province").fill("Test Province");

  await page.getByPlaceholder("Enter Postal Code").fill("Test Postal Code");

  await page.getByPlaceholder("Enter Country").fill("Test Country");

  await expect(page.getByRole("button", { name: "Next" })).toBeEnabled();

  await page.getByRole("button", { name: "Next" }).click();

  await expect(page.getByRole("heading", {name: "Please Confirm Details",})).toBeVisible();

  await expect(page.getByText("Test First Name Test Last Name")).toBeVisible();

  await expect(page.getByText("444-444-4444")).toBeVisible();

  await expect(page.getByText("555-555-5555")).toBeVisible();

  await expect(page.getByText("Test@gmail.com")).toBeVisible();

  await expect(page.getByText("Test Address, Test City, Test Province, Test Country"),).toBeVisible();

  await expect(page.getByText("Test Postal Code")).toBeVisible();
  await expect(page.getByText("Test Brand")).toBeVisible();
  await expect(page.locator("#preview_product")).toHaveText("Electric Dryer");
  await expect(page.getByText("Test Customer Problem Description"),).toBeVisible();
  await expect(page.getByText(new Date().toLocaleDateString("en-GB")),).toBeVisible();
  await expect(page.locator(".service_name")).toHaveText("Electric Dryer");

  await expect(page.locator(".category_name")).toHaveText("Electric Appliances - Diagnosis",);
  await expect(page.getByText("$110.00")).toBeVisible();

  await expect(page.getByRole("button", { name: "Confirm" })).toBeEnabled();

  await page.getByRole("button", { name: "Confirm" }).click();

  await expect(page.getByRole("heading", {name: "Congratulations!",})).toBeVisible();

  await expect(page.getByText("Booking created successfully"),).toBeVisible();

  await page.getByRole("button", {name: "OK",}).click();

  await sidebar.openSidebar.click();

  await sidebar.contactUs.click();
 
  await sidebar.openingHours.click();

  // await page.pause();

});
