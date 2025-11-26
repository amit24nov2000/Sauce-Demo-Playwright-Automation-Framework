/**
 * ============================================================================
 * LOGIN TEST SPECIFICATION
 * ============================================================================
 *
 * This test file handles user authentication for the Sauce Demo application.
 * It is configured as a setup project that runs before other tests,
 * establishing and saving the authentication state for reuse.
 *
 * @module tests/specs/Login.spec
 * @description Authentication setup test for session state persistence
 *
 * Project Configuration:
 * - Runs as 'setup' project (see playwright.config.ts)
 * - Saves authentication state to storage/auth.json
 * - Other projects depend on this for pre-authenticated sessions
 * ============================================================================
 */

import { test } from "../../Fixtures/BaseFixtures/PomObjects";

/**
 * Login Test - Authentication Setup
 *
 * This test performs the initial login to the Sauce Demo application
 * and saves the authenticated session state. The saved state is then
 * used by dependent test projects to skip login in subsequent tests.
 *
 * Test Steps:
 * 1. Navigate to the Sauce Demo login page
 * 2. Perform login with standard_user credentials
 * 3. Save the authenticated browser state to JSON file
 *
 * @requires PASSWORD - Environment variable containing the user password
 */
test('Login Test', async ({ page, loginPage }) => {
    // Step 1: Navigate to the Sauce Demo login page
    await page.goto('https://www.saucedemo.com/');

    // Step 2: Perform login using standard_user credentials
    // Password is loaded from environment variable for security
    await loginPage.Login('standard_user', process.env.PASSWORD!);

    // Step 3: Save the authenticated session state
    // This file is used by the 'authenticated' project in playwright.config.ts
    await page.context().storageState({ path: 'storage/auth.json' });
});
