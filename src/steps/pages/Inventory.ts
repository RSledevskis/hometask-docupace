import { Locator, Page, test } from "@playwright/test";

export class Inventory {
    private inventoryContainer: Locator;
    private addToCartBackpackBtn: Locator;

    public constructor(private page: Page) {
        this.inventoryContainer = this.page.getByTestId("inventory-container");
        this.addToCartBackpackBtn = this.page.getByTestId("add-to-cart-sauce-labs-backpack");
    }

    public async waitForInventoryContainer(): Promise<void> {
        await test.step("Waits for Inventory Container to appear", async () => {
            await this.inventoryContainer.waitFor();
        });
    }

    public async clickOnAddToCartBackpackBtn(): Promise<void> {
        await test.step("Clicks on 'Add to cart' Backpack item", async () => {
            await this.addToCartBackpackBtn.click();
        });
    }
}
