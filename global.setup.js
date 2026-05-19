import { chromium }
  from "@playwright/test";

import { portals }
  from "./configs/portalConfig.js";

import { loginToPortal }
  from "./utils/loginHelper.js";

async function globalSetup() {

  if (process.env.PORTAL !== "rja") {
    return;
  }

  const browser =
    await chromium.launch();

  const page =
    await browser.newPage();

  // Login to RJA
  await loginToPortal(
    page,
    portals.rja
  );

  // SAVE AUTH STATE
  await page.context().storageState({
    path: 'auth/rja-auth.json'
  });

  await browser.close();

}

export default globalSetup;