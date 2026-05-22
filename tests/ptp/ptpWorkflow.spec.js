import { test, expect } from "@playwright/test";

import { Sidebar } from "../../pages/ptp/Sidebar.js";

import { ptpData } from "../../test-data/ptpData.js";

test("PTP portal loads with saved auth", async ({ page }) => {

  const sidebar = new Sidebar(page);

  await page.goto(process.env.PTP_URL);


  await expect(sidebar.openSidebar).toBeVisible();

  await sidebar.openSidebar.click();

  await expect(sidebar.sidebar).toBeVisible();


  await sidebar.ptpPortal.click();

  await expect(page.getByRole("heading", { name: "Progress Tracker Portal" })).toBeVisible();

  await page.getByPlaceholder("Enter Job ID").fill(ptpData.jobId);

  await page.getByRole("button", { name: "Search Job" }).click();

  await expect(page.getByRole("heading", { name: "Current Job Status" })).toBeVisible();

  console.log("Job searching is working");

  await sidebar.ptpLogs.click();

  await expect(page.getByRole("heading", { name: "PTP Logs" })).toBeVisible();

  await expect(page.locator("table tbody tr").first()).toContainText(ptpData.jobId);

  await expect(page.locator("table tbody tr").first()).toContainText(new Date().toLocaleDateString("en-CA"));

  console.log("PTP logs validation is working");

  await sidebar.settings.hover();

  await sidebar.progressBarSetting.click();

  await expect(page.getByRole("heading", { name: "Progress Bar Setting" })).toBeVisible();

  console.log("Progress Bar Settings page is working");

  // await page.getByRole("button", {name: "Add Main Stage",}).click();

  // await expect(page.locator('input[wire\\:model$=".board_id"]').last()).toBeVisible();

  // await page.locator('input[wire\\:model$=".board_id"]').last().fill("4444444444");

  // await page.locator('input[wire\\:model$=".current_job_main_stage"]').last().fill("Test Current Job Main Stage");

  // await page.getByRole("button", { name: "Add Sub Stage", }).click();

  // await expect(page.locator('input[wire\\:model$=".board_id"]').last()).toBeVisible();

  // await page.locator('input[wire\\:model$=".board_id"]').last().fill("4444444444");

  // await page.locator('input[wire\\:model$=".group_id"]').last().fill("gts_12341");

  // await page.locator('input[wire\\:model$=".current_job_sub_stage"]').last().fill("New Inquiry");

  await page.pause();

});