import { LoginPage } from '../pages/common/LoginPage.js';

import { getLatestOTP } from './otpHelper.js';

export async function loginToPortal(page, portal) {

    const loginPage = new LoginPage(page);

    // Open portal
    await page.goto(portal.url);

    // Enter email
    await loginPage.enterEmail(portal.email);

    // Wait for OTP mail
    await page.waitForTimeout(5000);

    // Fetch OTP
    const otp = await getLatestOTP();

    console.log('Fetched OTP:', otp);

    // Enter OTP
    await loginPage.enterOTP(otp);

    // Click Verify/Login
    await loginPage.clickVerifyButton();

    // Wait after login
    await page.waitForLoadState('networkidle');

    // Save auth state
    await page.context().storageState({
        path: `auth/${portal.name}-auth.json`
    });

}