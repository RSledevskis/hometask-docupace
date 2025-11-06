# hometask-docupace

## Overview
This project is an end-to-end test automation suite using Playwright with TypeScript.

## Prerequisites
- Node.js (version >= 16)
- Yarn package manager

## Installation
1. Install the project
```bash
git clone https://github.com/RSledevskis/hometask-docupace.git
cd hometask-docupace
```
2. Install Dependencies
```bash
yarn install
```
3. Install Playwright Browsers
```bash
yarn install-browsers
```

## Tests Execution
This project supports running Playwright tests against multiple environments: dev and test.
Each environment loads the appropriate configuration for base URLs and timeouts.

### How to run tests
1. Set the `ENV` environment variable to control which environment config is used. If the variable is not set, the `dev` configuration is used by default.
2. Run tests using the command defined in `package.json` scripts

```bash
# Run all tests against the DEV environment (default) in headless mode with:
yarn playwright:run

# Run all tests against the DEV environment (default) in UI mode with:
yarn playwright:run --ui

# Run all tests against the test environment in headless mode with:
ENV=test yarn playwright:run

# Run all tests against the test environment in UI mode with:
ENV=test yarn playwright:run --ui
```

### How to filter out tests
The project provides several projects setups based on the defined test scope via build-in Playwrights tags functionality

```bash
# Run '@smoke' defined test scope
yarn playwright:run --grep smoke

# Run '@regression' defined test scope
yarn playwright:run --grep regression
```

### Test reports
By default, Playwright generates HTML reports after test runs. You can view them with:

```bash
yarn playwright show-report
```

## Configuration
- `playwright.config.ts` defines test settings such as browsers, retries, timeout and others.
- Some configuration parts, like: 'baseUrl' and 'timeout' are configurable per environment through `./config/` directory
