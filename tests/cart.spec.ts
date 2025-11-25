import { expect, test } from "@playwright/test";
import { testDataLoader } from "../src/utils/testDataLoader";
import { openUrl } from "../src/utils/openUrl";
import { Shop } from "../src/steps/Shop";
import { setLocalStorageItems, Items, getLocalStorageItems } from "../src/utils/localStorage";

test.describe("Cart", { tag: ["@smoke", "@regression"] }, () => {
    test.beforeAll(() => {
        testDataLoader.validateDataVersion();
    });

    test("Should be able to add item to cart", async ({ page }) => {
        const shop = new Shop(page);
        const user = testDataLoader.getUserById("standard_user");

        await openUrl(page);
        await shop.login.waitForLoginLogo();
        await shop.login.login(user.username, user.password);
        await shop.inventory.waitForInventoryContainer();
        await shop.inventory.clickOnAddToCartBackpackBtn();
        await shop.cart.clickOnShoppingCartLink();

        // local storage check
        const locallyStoredItems = await getLocalStorageItems(page);
        console.log(locallyStoredItems);
        expect(locallyStoredItems.length).toBe(1);

        // visual representation check
        const visuallyVisibleItem = await page.getByTestId("inventory-item").all();
        expect(visuallyVisibleItem.length).toBe(1);

        await expect(page).toHaveURL(/cart.html/);
    });

    test("Should be able to delete item from cart", async ({ page }) => {
        const shop = new Shop(page);
        const user = testDataLoader.getUserById("standard_user");

        await openUrl(page);
        await shop.login.waitForLoginLogo();
        await shop.login.login(user.username, user.password);
        await shop.inventory.waitForInventoryContainer();
        await setLocalStorageItems(page, Items.OneItem);
        await shop.cart.clickOnShoppingCartLink();
        await shop.cart.waitForPageTitle();
        await shop.cart.clickOnRemoveBackpackBtn();

        // local storage check
        const locallyStoredItems = await getLocalStorageItems(page);
        expect(locallyStoredItems).toStrictEqual([]);

        // visual representation check
        const inventoryItems = await page.getByTestId("inventory-item").all();
        expect(inventoryItems.length).toBe(0);

        await expect(page).toHaveURL(/cart.html/);
    });
});
