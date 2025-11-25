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
3. Install Playwright Chromium
```bash
yarn playwright install --with-deps chromium
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
ENV=TEST yarn playwright:run

# Run all tests against the test environment in UI mode with:
ENV=TEST yarn playwright:run --ui
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
- Some configuration parts, like: 'baseUrl', 'dataVersion', 'timeout' are configurable per environment through `./envConfig/` directory

## Continuous Integration (CI) with GitHub Actions

This project uses GitHub Actions for continuous integration and automated test execution.

### Workflow Location
The CI pipeline is defined in `.github/workflows/tests.yml`. All configuration and setup steps are managed directly in the repository.

### Triggering Test Runs

Test runs are triggered manually via the GitHub Actions tab using a Workflow Dispatch event. To start a test run:
1. Go to GitHub repository's `Actions` tab.
2. Select `Playwright Tests` workflow on the left.
3. Click `Run workflow` button.
4. Choose your desired environment (`DEV`, `TEST`) and (optionally) a specific test suite (`all`, `@smoke`, `@regression`).
5. Click `Run workflow` to start the tests.

### What happens in the pipeline

Check out the latest code from the repository.

- Check out the latest code from the repository.
- Set up a Node.js environment.
- Install the required project dependencies.
- Install Playwright Chromium browser.
- Execute tests for the selected environment and tag, if specified.
- Upload the generated test report as an artifact for download and review.

You can find and download the latest test report from the workflow run’s `Artifacts` section.

## Test Reporting

Test results are saved as HTML reports and can be downloaded from each workflow run’s `Artifacts` section for offline viewing.
Additionally, the `github` reporter was added in order to clearly see the result of the pipeline execution through the log. 


## Extra

### Static code analysis
The project has tools configured in order to statically analyse and validate the written code before it gets commited.
1. ESLint: statically analyzes the code to quickly find problems
2. Prettier: an assertive code formatter
3. Husky: automatically triggers lint command once the commit is initiated and blocks the commit in case of errors

These tools work together in the following sequence: Prettier has set of rules fot the code formatting.
Prettier is set as a rule for the linter that checks the code quality together with other rules defined in config.
Husky triggers the `yarn lint` command on pre-commit hook.

## License
Copyright © [2025] [Rainers Sledevskis]

This project was completed as part of a recruitment assignment.  
No permission is granted to use, copy, modify, distribute, or create derivative works from this code or any part thereof for any purpose except evaluation as part of the hiring process.
