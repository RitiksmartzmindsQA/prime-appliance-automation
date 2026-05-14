export async function waitForPageLoad(page) {

    await page.waitForLoadState('networkidle');

}

export async function waitForLoaderToDisappear(page, locator) {

    await page.locator(locator).waitFor({
        state: 'hidden'
    });

}

export async function waitAndClick(page, locator) {

    await page.locator(locator).waitFor({
        state: 'visible'
    });

    await page.locator(locator).click();

}

export async function waitAndFill(page, locator, value) {

    await page.locator(locator).waitFor({
        state: 'visible'
    });

    await page.locator(locator).fill(value);

}