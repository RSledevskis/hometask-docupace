import { Page, test } from "@playwright/test";

export async function openUrl(page: Page): Promise<void> {
    await test.step("Opens url", async () => {
        await page.goto("/");
        await waitForFontsLoad(page);
    });
}

/*
 * The 'fonts' property of the 'document' returns the 'FontFaceSet' interface
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts
 * The 'ready' property of the 'FontFaceSet' interface returns a Promise which resolves to the given 'FontFaceSet'
 * https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/ready
 */
async function waitForFontsLoad(page: Page): Promise<void> {
    await page.evaluate(async () => {
        try {
            await document.fonts.ready;
            console.log("All fonts have been loaded");
        } catch (error) {
            console.log(`Error loading fonts: ${error}`);
        }
    });
}
