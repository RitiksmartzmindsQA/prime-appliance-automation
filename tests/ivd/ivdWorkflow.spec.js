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

    await page.getByPlaceholder("Prime Job UUID").click();
    await page.getByPlaceholder("Prime Job UUID").pressSequentially("Test Job UUID");

    await page.getByPlaceholder("B2B/Warranty Reference").click();
    await page.getByPlaceholder("B2B/Warranty Reference").pressSequentially("Test B2B/Warranty Reference");

    await page.getByPlaceholder("Customer First Name").click();
    await page.getByPlaceholder("Customer First Name").pressSequentially("Test Customer First Name");

    await page.getByPlaceholder("Customer Last Name").click();
    await page.getByPlaceholder("Customer Last Name").pressSequentially("Test Customer Last Name");

    await page.getByPlaceholder("(000) 000-0000").first().click();
    await page.getByPlaceholder("(000) 000-0000").first().pressSequentially("4444444444");

    await page.getByPlaceholder("Customer Email").click();
    await page.getByPlaceholder("Customer Email").pressSequentially("test@gmail.com");

    await page.getByPlaceholder("Address").click();
    await page.getByPlaceholder("Address").pressSequentially("Test Address");

    await page.getByPlaceholder("Unit (Optional)").click();
    await page.getByPlaceholder("Unit (Optional)").pressSequentially("Test Unit");

    await page.getByPlaceholder("City").click();
    await page.getByPlaceholder("City").pressSequentially("Test City");

    await page.getByPlaceholder("Province/ State").click();
    await page.getByPlaceholder("Province/ State").pressSequentially("Test Province/ State");
 
    await page.getByPlaceholder("Enter ZIP/Postal Code").click();
    await page.getByPlaceholder("Enter ZIP/Postal Code").pressSequentially("Q4R 2Q5");

    await page.getByPlaceholder("Country").click();
    await page.getByPlaceholder("Country").pressSequentially("Test Country");

    await page.locator('textarea[wire\\:model="customer_problem_description"]').click();
    await page.keyboard.type("Test customer problem description");

    await page.locator("#fileInput").setInputFiles("assets/images/dummy-image.jpg");
    await page.locator("#fileInput").setInputFiles("assets/images/dummy-image.png");

    await page.getByPlaceholder("Appliance Full Model Number").click();
    await page.getByPlaceholder("Appliance Full Model Number").pressSequentially("Test Appliance Full Model Number");

    await page.getByPlaceholder("Appliance Full Serial Number").click();
    await page.getByPlaceholder("Appliance Full Serial Number").pressSequentially("Test appliance serial number");

    await page.locator("#fileInputModelSerial").setInputFiles("assets/images/dummy-image.jpg");

    // await expect(page.getByText("IDV has been successfully saved!")).toBeVisible();

    // await page.getByRole('button', {name: 'Submit'}).click();

    // await sidebar.openSidebar.click();

    // await sidebar.submittedIDV.click();

    await page.pause();

});