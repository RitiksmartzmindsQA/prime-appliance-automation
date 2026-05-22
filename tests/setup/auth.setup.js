import { test } from "@playwright/test";
import { portals } from "../../configs/portalConfig.js";
import { loginToPortal } from "../../utils/loginHelper.js";

test.setTimeout(90000);

test("Portal login setup", async ({ page }, testInfo) => {

    const portalName =
        testInfo.project.metadata?.portalName;

    const portal =
        portals[portalName];

    if (!portal) {
        throw new Error(
            `Missing portal config for auth setup project "${testInfo.project.name}".`
        );
    }

    if (!portal.url || !portal.email) {
        throw new Error(
            `Missing URL or email environment variable for "${portal.name}".`
        );
    }

    await loginToPortal(
        page,
        portal
    );

    await page.context()
        .storageState({

            path:
                `auth/${portal.name}-auth.json`,

        });

});
