import { Locator, Page, test } from "@playwright/test";

export class Cart {
    private shoppingCartLink: Locator;
    private pageTitle: Locator;
    private removeBackpackBtn: Locator;

    public constructor(private page: Page) {
        this.shoppingCartLink = this.page.getByTestId("shopping-cart-link");
        this.pageTitle = this.page.getByTestId("title");
        this.removeBackpackBtn = this.page.getByTestId("remove-sauce-labs-backpack");
    }

    public async clickOnShoppingCartLink(): Promise<void> {
        await test.step("Clicks on Shopping Cart Link", async () => {
            await this.shoppingCartLink.click();
        });
    }

    public async waitForPageTitle(): Promise<void> {
        await test.step("Waits for Title to appear", async () => {
            await this.pageTitle.waitFor();
        });
    }

    public async clickOnRemoveBackpackBtn(): Promise<void> {
        await test.step("Clicks on 'Remove' Backpack item", async () => {
            await this.removeBackpackBtn.click();
        });
    }
}
