import { Page, test } from "@playwright/test";

export enum Items {
    OneItem = "[4]",
    TwoItems = "[1,4]",
}

export async function setLocalStorageItems(page: Page, item: Items): Promise<void> {
    await test.step("Set Local Storage Item(s)", async () => {
        await page.evaluate((item) => {
            localStorage.setItem("cart-contents", item);
        }, item);
    });
}

export async function getLocalStorageItems(page: Page): Promise<number[] | []> {
    return test.step("Get Local Storage Item(s)", async () => {
        return page.evaluate(() => JSON.parse(localStorage.getItem("cart-contents")));
    });
}
