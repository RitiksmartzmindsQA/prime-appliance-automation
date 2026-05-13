import { chromium } from '@playwright/test';

import { portals } from './configs/portalConfig.js';

import { loginToPortal } from './utils/loginHelper.js';

async function globalSetup() {

    const browser = await chromium.launch({
        headless: false
    });

    const page = await browser.newPage();

    // Login to RJA
    await loginToPortal(page, portals.rja);

    await browser.close();
}

export default globalSetup;