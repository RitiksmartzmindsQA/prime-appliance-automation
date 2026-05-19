import { test } from "@playwright/test";

import { portals } from "../../configs/portalConfig.js";

import { loginToPortal } from "../../utils/loginHelper.js";

test.setTimeout(90000);

test("RJA login setup", async ({ page }) => {
    await loginToPortal(page, portals.rja);

    await page.context().storageState({
        path: "auth/rja-auth.json",
    });
});
