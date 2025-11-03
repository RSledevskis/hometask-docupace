# hometask-docupace

## Overview
This project is an end-to-end test automation suite using Playwright with TypeScript.

## Prerequisites
- Node.js (version >= 16)
- Yarn package manager

## Installation
1. Install the project
```txt
git clone https://github.com/RSledevskis/hometask-docupace.git
cd hometask-docupace
```
2. Install Dependencies
```txt
yarn install
```
3. Install Playwright Browsers
```txt
yarn install-browsers
```

## Tests Execution
Run all tests in headless mode with:
```txt
yarn playwright:run
```

Run all tests in UI mode with:
```txt
yarn playwright:run --ui
```
## Configuration
- `playwright.config.ts` defines test settings such as browsers, retries, timeout and others.
