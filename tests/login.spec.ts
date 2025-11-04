import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/steps/LoginPage";

test.describe("User login", () => {
    test("Should be able to login with valid credentials", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
        const loginPage = new LoginPage(page);
        await loginPage.waitForLoginLogo();
        await loginPage.login("standard_user", "secret_sauce");

        await expect(page.locator("[class='app_logo']")).toBeVisible();
    });

    test("Shouldn't be able to login with invalid credentials", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
        const loginPage = new LoginPage(page);
        await loginPage.waitForLoginLogo();
        await loginPage.login("locked_out_user", "secret_sauce");

        await expect(loginPage.errorMessage).toHaveText(
            "Epic sadface: Sorry, this user has been locked out.",
        );
    });
});
