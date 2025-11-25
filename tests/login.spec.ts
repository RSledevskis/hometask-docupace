import { test, expect } from "@playwright/test";
import { openUrl } from "../src/utils/openUrl";
import { WaitTime } from "../src/constansts/waitTime";
import { testDataLoader } from "../src/utils/testDataLoader";
import { Shop } from "../src/steps/Shop";

test.describe("User login", { tag: "@regression" }, () => {
    test.beforeAll(() => {
        testDataLoader.validateDataVersion();
    });

    test.describe("Positive scenarios", { tag: "@smoke" }, () => {
        const users = testDataLoader.getUsersByType("valid");
        for (const user of users) {
            test(`Should be able to login with ${user.id} credentials`, async ({ page }) => {
                const shop = new Shop(page);

                await openUrl(page);
                await shop.login.waitForLoginLogo();
                await shop.login.login(user.username, user.password);

                await expect(page.locator("[class='app_logo']")).toBeVisible({
                    timeout: WaitTime.TenSeconds,
                });
                await expect(page).toHaveURL(/inventory.html/);
            });
        }
    });

    test.describe("Negative scenarios", () => {
        test("Shouldn't be able to login with invalid credentials", async ({ page }) => {
            const shop = new Shop(page);
            const user = testDataLoader.getUserById("invalid_user");

            await openUrl(page);
            await shop.login.waitForLoginLogo();
            await shop.login.login(user.username, user.password);

            await expect(shop.login.errorMessage).toHaveText(
                "Epic sadface: Username and password do not match any user in this service",
                { timeout: WaitTime.TenSeconds },
            );
        });

        test("Shouldn't be able to login with locked out user", async ({ page }) => {
            const shop = new Shop(page);
            const user = testDataLoader.getUserById("locked_out_user");

            await openUrl(page);
            await shop.login.waitForLoginLogo();
            await shop.login.login(user.username, user.password);

            await expect(shop.login.errorMessage).toHaveText(
                "Epic sadface: Sorry, this user has been locked out.",
                { timeout: WaitTime.TenSeconds },
            );
        });
    });
});
