import { expect } from "@playwright/test";

import { LoginPage } from "../pages/common/LoginPage.js";

import { waitForOTP }
  from "./otpHelper.js";

export async function loginToPortal(
  page,
  portal
) {
  const loginPage =
    new LoginPage(page);

  await page.goto(
    portal.url
  );

  const otpRequestedAt =
    Date.now();

  // Enter email
  await loginPage.enterEmail(
    portal.email
  );

  await expect(
    loginPage.otpInput
  ).toBeVisible({
    timeout: 15000,
  });

  // Fetch OTP
  const otp =
    await waitForOTP(
      60000,
      otpRequestedAt
    );

  console.log(
    "Fetched OTP:",
    otp
  );

  // Fill OTP
  await loginPage.enterOTP(
    otp
  );

  // Verify OTP
  await loginPage.clickVerifyButton();

  if (portal.authenticatedSelector) {
    await expect(
      page.locator(
        portal.authenticatedSelector
      )
    ).toBeVisible({
      timeout: 30000,
    });
  } else {
    await expect(
      loginPage.emailInput
    ).toBeHidden({
      timeout: 30000,
    });
  }

}
