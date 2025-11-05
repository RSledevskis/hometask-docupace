import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { openUrl } from "../src/utils/openUrl";
import { WaitTime } from "../src/constansts/waitTime";
import { testDataLoader } from "../src/utils/testDataLoader";

test.describe("User login", () => {
    test.beforeAll(() => {
        testDataLoader.validateDataVersion();
    });

    test("Should be able to login with valid credentials", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const user = testDataLoader.getUserById("standard_user");

        await openUrl(page);
        await loginPage.waitForLoginLogo();
        await loginPage.login(user.username, user.password);

        await expect(page.locator("[class='app_logo']")).toBeVisible({
            timeout: WaitTime.TenSeconds,
        });
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
