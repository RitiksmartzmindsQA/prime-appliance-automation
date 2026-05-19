import { expect } from "@playwright/test";

import { LoginPage } from "../pages/common/LoginPage.js";

import { getLatestOTP } from "./otpHelper.js";

async function waitForOTP() {
  const timeout = 60000;
  const interval = 5000;
  const deadline = Date.now() + timeout;

  let lastError;

  while (Date.now() < deadline) {
    try {
      const otp = await getLatestOTP();

      if (/^\d{4,6}$/.test(otp)) {
        return otp;
      }

      lastError = new Error(`Invalid OTP format received: ${otp}`);
    } catch (error) {
      lastError = error;
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  throw new Error(
    `OTP was not found within ${timeout / 1000} seconds. Last error: ${
      lastError?.message ?? "No OTP email found"
    }`,
  );
}

export async function loginToPortal(page, portal) {
  const loginPage = new LoginPage(page);

  // Open portal
  await page.goto(portal.url);

  // Enter email
  await loginPage.enterEmail(portal.email);

  await expect(loginPage.otpInput).toBeVisible({
    timeout: 15000,
  });

  const otp = await waitForOTP();

  console.log("Fetched OTP:", otp);

  // Enter OTP
  await loginPage.enterOTP(otp);

  await expect(loginPage.otpInput).toHaveValue(otp);

  // Click Verify/Login
  await loginPage.clickVerifyButton();

  await expect(loginPage.emailInput).toBeHidden({
    timeout: 30000,
  });
}
