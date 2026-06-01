import { test, expect } from "@playwright/test";

import { Sidebar } from "../../pages/ivd/Sidebar.js";

test("Complete Workflow", async ({ page }) => {

    const sidebar = new Sidebar(page);

    await page.goto(process.env.IVD_URL);

    await sidebar.openSidebar.click();

    await sidebar.idvPortal.click();

    await expect(sidebar.newIDV).toBeVisible();

    await sidebar.newIDV.click();

    await expect(page.getByRole("heading", {name: "Transmission Information",})).toBeVisible();

    console.log("New IDV page opened successfully");

    await page.getByPlaceholder("Prime Job UUID").fill("Test123 UUID");

    await page.getByPlaceholder("B2B/Warranty Reference").fill("Test B2B/Warranty Reference");

    await page.getByPlaceholder("Customer First Name").fill("Test Customer First Name");

    await page.getByPlaceholder("Customer Last Name").fill("Test Customer Last Name");

    await page.getByPlaceholder("(000) 000-0000").first().fill("Test Customer First Name");

    await page.getByPlaceholder("Customer Email").fill("test@gmail.com");

    await page.getByPlaceholder("Address").fill("Test Address");

    await page.getByPlaceholder("Unit (Optional)").fill("Test Unit (Optional)");

    await page.getByPlaceholder("City").fill("Test City");

    await page.getByPlaceholder("Province/ State").fill("Test Province/ State");

    await page.getByPlaceholder("Enter ZIP/Postal Code").fill("Q4R 2Q5");

    await page.getByPlaceholder("Country").fill("Test Country");

});