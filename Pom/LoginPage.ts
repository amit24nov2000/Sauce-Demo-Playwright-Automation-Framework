/**
 * ============================================================================
 * LOGIN PAGE - PAGE OBJECT MODEL
 * ============================================================================
 *
 * This class encapsulates all interactions with the Sauce Demo login page.
 * It follows the Page Object Model (POM) design pattern to provide a clean
 * separation between test logic and page-specific implementation details.
 *
 * @class LoginPage
 * @description Handles user authentication on the Sauce Demo application
 * @see https://www.saucedemo.com/
 * ============================================================================
 */

import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {

    /* -----------------------------------------------------------------------
     * LOCATORS
     * These properties define the page elements used for login functionality
     * ----------------------------------------------------------------------- */

    /** Input field for entering the username */
    readonly userNameInputField: Locator;

    /** Input field for entering the password */
    readonly passwordInputField: Locator;

    /** Login button to submit credentials */
    readonly loginButton: Locator;

    /* -----------------------------------------------------------------------
     * CONSTRUCTOR
     * ----------------------------------------------------------------------- */

    /**
     * Creates an instance of LoginPage
     *
     * @param page - Playwright Page object for browser interactions
     *
     * @example
     * const loginPage = new LoginPage(page);
     */
    constructor(private page: Page) {
        // Initialize locators using Playwright's recommended locator strategies
        this.userNameInputField = this.page.getByPlaceholder('Username');
        this.passwordInputField = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.locator(`//*[@name="login-button"]`);
    }

    /* -----------------------------------------------------------------------
     * ACTIONS
     * ----------------------------------------------------------------------- */

    /**
     * Performs login operation with provided credentials
     *
     * This method fills in the username and password fields, clicks the login
     * button, and waits for successful authentication by verifying the login
     * button is no longer visible.
     *
     * @async
     * @param userName - The username for authentication
     * @param password - The password for authentication
     * @throws Error if login fails or elements are not interactable
     *
     * @example
     * await loginPage.Login('standard_user', 'secret_sauce');
     *
     * @remarks
     * Valid test users for Sauce Demo:
     * - standard_user
     * - locked_out_user
     * - problem_user
     * - performance_glitch_user
     * - error_user
     * - visual_user
     */
    async Login(userName: string, password: string): Promise<void> {
        try {
            // Enter username
            await this.userNameInputField.fill(userName);

            // Enter password
            await this.passwordInputField.fill(password);

            // Click login button
            await this.loginButton.click();

            // Verify successful login by checking login button is hidden
            await expect(this.loginButton).toBeHidden();

        } catch (error) {
            console.log(`[LoginPage] Login failed for user '${userName}': ${error}`);
            throw error;
        }
    }
}