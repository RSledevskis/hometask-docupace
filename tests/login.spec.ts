import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { openUrl } from "../src/utils/openUrl";
import { WaitTime } from "../src/constansts/waitTime";
import { testDataLoader } from "../src/utils/testDataLoader";

test.describe("User login", () => {
    test.beforeAll(() => {
        testDataLoader.validateDataVersion();
    });

    test.describe("Positive scenarios", { tag: ["@smoke", "@regression"] }, () => {
        const users = testDataLoader.getUsersByType("valid");
        for (const user of users) {
            test(`Should be able to login with ${user.id} credentials`, async ({ page }) => {
                const loginPage = new LoginPage(page);

                await openUrl(page);
                await loginPage.waitForLoginLogo();
                await loginPage.login(user.username, user.password);

                await expect(page.locator("[class='app_logo']")).toBeVisible({
                    timeout: WaitTime.TenSeconds,
                });
                await expect(page).toHaveURL(/inventory.html/);
            });
        }
    });

    test.describe("Negative scenarios", { tag: "@regression" }, () => {
        test("Shouldn't be able to login with invalid credentials", async ({ page }) => {
            const loginPage = new LoginPage(page);
            const user = testDataLoader.getUserById("invalid_user");

            await openUrl(page);
            await loginPage.waitForLoginLogo();
            await loginPage.login(user.username, user.password);

            await expect(loginPage.errorMessage).toHaveText(
                "Epic sadface: Username and password do not match any user in this service",
                { timeout: WaitTime.TenSeconds },
            );
        });

        test("Shouldn't be able to login with locked out user", async ({ page }) => {
            const loginPage = new LoginPage(page);
            const user = testDataLoader.getUserById("locked_out_user");

            await openUrl(page);
            await loginPage.waitForLoginLogo();
            await loginPage.login(user.username, user.password);

            await expect(loginPage.errorMessage).toHaveText(
                "Epic sadface: Sorry, this user has been locked out.",
                { timeout: WaitTime.TenSeconds },
            );
        });
    });
});
