import { Locator, Page, test } from "@playwright/test";

export class LoginPage {
    public errorMessage: Locator;
    private userNameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private loginLogo: Locator;

    public constructor(private page: Page) {
        this.userNameInput = this.page.getByTestId("username");
        this.passwordInput = this.page.getByTestId("password");
        this.loginButton = this.page.getByTestId("login-button");
        this.loginLogo = this.page.locator("[class='login_logo']");
        this.errorMessage = this.page.getByTestId("error");
    }

    public async waitForLoginLogo(): Promise<void> {
        await test.step("Waits for Login Logo to appear", async () => {
            await this.loginLogo.waitFor();
        });
    }

    public async login(username: string, password: string): Promise<void> {
        await test.step("Enters credentials and clicks Login button", async () => {
            await this.userNameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        });
    }
}
