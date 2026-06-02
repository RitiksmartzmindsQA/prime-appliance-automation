import { test, expect } from "@playwright/test";

import { Sidebar } from "../../pages/pap/Sidebar.js";

test("Complete Wokflow", async ({ page }) => {

    const sidebar = new Sidebar(page);

    await page.goto(process.env.PAP_URL);

    await expect(page.getByRole("heading", { name: "Part Availability Portal" })).toBeVisible();

    console.log("PAP portal opened successfully");

    await page.getByPlaceholder("Enter part number").fill("W11660283"),

    await page.getByPlaceholder("Enter postal code").fill("M1B 5K7"),

    await page.getByRole("button", {name: "Search",}).click();

    await page.waitForLoadState('networkidle');

    await expect(page.getByText("PASSED").first()).toBeVisible();

    await expect(sidebar.papLogs).toBeVisible();

    await sidebar.papLogs.click();

    await expect(page.getByRole("heading", { name: "PAP Logs", })).toBeVisible();

    await expect(page.locator("table tbody tr").first()).toContainText("W11660283");

    await expect(page.locator("table tbody tr").first()).toContainText("M1B 5K7");

    console.log("Positive search is working fine");

    await page.goto(process.env.PAP_URL);

    await expect(page.getByRole("heading", { name: "Part Availability Portal" })).toBeVisible();

    await page.getByPlaceholder("Enter part number").fill("14124124"),

    await page.getByPlaceholder("Enter postal code").fill("M1B 5K7"),

    await page.getByRole("button", { name: "Search", }).click();

    await page.waitForLoadState('networkidle');

    await expect(page.getByText("FAILED").first()).toBeVisible();

    console.log("Wrong product search is working fine");

    await expect(sidebar.papLogs).toBeVisible();

    await sidebar.papLogs.click();

    await expect(page.getByRole("heading", {name: "PAP Logs",})).toBeVisible();

    console.log("PAP Logs page opened successfully");

    await expect(page.locator("table tbody tr").first()).toContainText("14124124");

    await expect(page.locator("table tbody tr").first()).toContainText("M1B 5K7");

    // await page.pause();

    }

);