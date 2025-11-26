/**
 * ============================================================================
 * VISUAL TESTING SPECIFICATION (SNAPSHOT TESTING)
 * ============================================================================
 *
 * This test file contains visual regression tests for the Sauce Demo application.
 * It captures screenshots and compares them against baseline images to detect
 * unintended UI changes.
 *
 * @module tests/specs/VisualTests.spec
 * @description Visual regression tests using Playwright's snapshot testing
 *
 * Visual Testing Benefits:
 * - Detects layout shifts and CSS regressions
 * - Catches color and font changes
 * - Identifies missing or extra elements
 * - Validates UI consistency across deployments
 *
 * Commands:
 * - Run tests: npx playwright test VisualTests.spec.ts
 * - Update snapshots: npx playwright test VisualTests.spec.ts --update-snapshots
 *
 * Snapshot Storage: tests/snapshots/VisualTests.spec.ts-snapshots/
 * ============================================================================
 */

import { test } from "../../Fixtures/BaseFixtures/PomObjects";
import { expect } from "@playwright/test";

/* ---------------------------------------------------------------------------
 * LOGIN PAGE VISUAL TESTS
 * --------------------------------------------------------------------------- */

/**
 * Visual Test: Login Page - Full Page Screenshot
 *
 * Captures and compares a full-page screenshot of the login page.
 * This test verifies the overall visual appearance of the login page
 * hasn't changed unexpectedly.
 *
 * Test Steps:
 * 1. Navigate to the login page
 * 2. Wait for page to fully load
 * 3. Capture and compare full-page screenshot
 */
test('Visual Test: Login Page Full Screenshot', async ({ page }) => {
    // Step 1: Navigate to the Sauce Demo login page
    await page.goto('https://www.saucedemo.com/');

    // Step 2: Wait for the login button to be visible (ensures page is loaded)
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // Step 3: Capture full-page screenshot and compare with baseline
    // First run creates the baseline; subsequent runs compare against it
    await expect(page).toHaveScreenshot('login-page-full.png', {
        fullPage: true,
        // Allow 0.1% pixel difference to handle minor rendering variations
        maxDiffPixelRatio: 0.001
    });
});

/**
 * Visual Test: Login Form Component Screenshot
 *
 * Captures and compares a screenshot of just the login form component.
 * This focused approach helps isolate UI changes to specific components
 * and makes debugging easier when visual differences are detected.
 *
 * Test Steps:
 * 1. Navigate to the login page
 * 2. Wait for login form to be visible
 * 3. Capture and compare login form screenshot
 */
test('Visual Test: Login Form Component', async ({ page, loginPage }) => {
    // Step 1: Navigate to the Sauce Demo login page
    await page.goto('https://www.saucedemo.com/');

    // Step 2: Wait for the username input to be visible
    await expect(loginPage.userNameInputField).toBeVisible();

    // Step 3: Capture the login form container screenshot
    // Using the login_container which wraps username, password, and login button
    const loginForm = page.locator('.login_wrapper');
    await expect(loginForm).toHaveScreenshot('login-form-component.png', {
        // Threshold for acceptable pixel differences (0 = exact match)
        threshold: 0.1
    });
});

/**
 * Visual Test: Login Button Element Screenshot
 *
 * Captures and compares a screenshot of the login button element.
 * This demonstrates element-level visual testing for critical UI components.
 *
 * Test Steps:
 * 1. Navigate to the login page
 * 2. Locate the login button
 * 3. Capture and compare button screenshot
 */
test('Visual Test: Login Button Element', async ({ page, loginPage }) => {
    // Step 1: Navigate to the Sauce Demo login page
    await page.goto('https://www.saucedemo.com/');

    // Step 2: Wait for the login button to be visible
    await expect(loginPage.loginButton).toBeVisible();

    // Step 3: Capture just the login button screenshot
    await expect(loginPage.loginButton).toHaveScreenshot('login-button.png');
});

/**
 * Visual Test: Error State Screenshot
 *
 * Captures and compares a screenshot of the login page in error state.
 * This verifies that error messages and visual indicators appear correctly.
 *
 * Test Steps:
 * 1. Navigate to the login page
 * 2. Attempt login with invalid credentials
 * 3. Capture and compare error state screenshot
 */
test('Visual Test: Login Error State', async ({ page, loginPage }) => {
    // Step 1: Navigate to the Sauce Demo login page
    await page.goto('https://www.saucedemo.com/');

    // Step 2: Enter invalid credentials and attempt login
    await loginPage.userNameInputField.fill('invalid_user');
    await loginPage.passwordInputField.fill('wrong_password');
    await loginPage.loginButton.click();

    // Step 3: Wait for error message to appear
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();

    // Step 4: Capture the login form with error state
    const loginContainer = page.locator('.login_wrapper');
    await expect(loginContainer).toHaveScreenshot('login-error-state.png', {
        // Allow slight differences for error animation/transitions
        maxDiffPixelRatio: 0.01
    });
});

