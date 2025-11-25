import { defineConfig, devices } from "@playwright/test";
import config from "./envConfig";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: "./tests",
    /* Timeout for each test */
    timeout: config.timeout,
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* No retries */
    retries: 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : 2,
    /* Reporters to use. See https://playwright.dev/docs/test-reporters */
    reporter: [["html"], ["github"]],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/') */
        baseURL: config.baseUrl,
        /* Record trace for the first run of each test, but not for retries. When test run passes, remove the recorded trace */
        trace: {
            mode: "retain-on-first-failure",
        },
        /* Default locator used across the project */
        testIdAttribute: "data-test",
    },

    /* Configure projects for different test scopes */
    projects: [
        {
            name: "all",
            use: { ...devices["Desktop Chrome"] },
        },

        {
            name: "smoke",
            testMatch: /regression/,
            use: { ...devices["Desktop Chrome"] },
        },

        {
            name: "regression",
            testMatch: /smoke/,
            use: { ...devices["Desktop Chrome"] },
        },
    ],
});
