/**
 * ============================================================================
 * CHECKOUT PAGE - PAGE OBJECT MODEL
 * ============================================================================
 *
 * This class encapsulates all interactions with the Sauce Demo checkout process.
 * It handles the multi-step checkout flow including information entry,
 * order review, and order completion.
 *
 * @class CheckoutPage
 * @description Manages the complete checkout workflow
 * @see https://www.saucedemo.com/checkout-step-one.html
 * ============================================================================
 */

import { Locator, Page } from "@playwright/test";

export class CheckoutPage {

    /* -----------------------------------------------------------------------
     * LOCATORS
     * These properties define the page elements for checkout functionality
     * ----------------------------------------------------------------------- */

    /** Checkout button on the cart page */
    readonly checkoutButton: Locator;

    /** First name input field in shipping information */
    readonly firstName: Locator;

    /** Last name input field in shipping information */
    readonly lastName: Locator;

    /** Postal/ZIP code input field in shipping information */
    readonly postalCode: Locator;

    /** Continue button to proceed to order summary */
    readonly continueButton: Locator;

    /** Finish button to complete the order */
    readonly finishButton: Locator;

    /** Order confirmation message element */
    readonly verifyOrderFinalStatement: Locator;

    /* -----------------------------------------------------------------------
     * CONSTRUCTOR
     * ----------------------------------------------------------------------- */

    /**
     * Creates an instance of CheckoutPage
     *
     * @param page - Playwright Page object for browser interactions
     *
     * @example
     * const checkoutPage = new CheckoutPage(page);
     */
    constructor(private page: Page) {
        // Cart page elements
        this.checkoutButton = page.locator(`//*[@data-test="checkout"]`);

        // Shipping information form elements
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.postalCode = page.getByPlaceholder('Zip/Postal Code');

        // Navigation and confirmation elements
        this.continueButton = page.locator(`//*[@data-test="continue"]`);
        this.finishButton = page.locator(`//*[@data-test="finish"]`);
        this.verifyOrderFinalStatement = page.getByText('Thank you for your order!');
    }

    /* -----------------------------------------------------------------------
     * CHECKOUT STEP 1: INITIATE CHECKOUT
     * ----------------------------------------------------------------------- */

    /**
     * Initiates the checkout process from the cart page
     *
     * Waits for the checkout button to be visible and clicks it
     * to navigate to the checkout information page.
     *
     * @async
     * @returns Promise<void>
     *
     * @example
     * await checkoutPage.performCheckoutOperation();
     */
    async performCheckoutOperation(): Promise<void> {
        await this.checkoutButton.waitFor({ state: 'visible' });
        await this.checkoutButton.click();
    }

    /* -----------------------------------------------------------------------
     * CHECKOUT STEP 2: ENTER SHIPPING INFORMATION
     * ----------------------------------------------------------------------- */

    /**
     * Fills in the shipping information form
     *
     * Enters test data into the first name, last name, and postal code fields.
     * Currently uses hardcoded test values.
     *
     * @async
     * @returns Promise<void>
     *
     * @example
     * await checkoutPage.fillInformationBox();
     *
     * @todo Accept parameters for custom shipping information
     */
    async fillInformationBox(): Promise<void> {
        // Wait for form to be ready
        await this.firstName.waitFor({ state: 'visible' });

        // Fill in shipping details
        await this.firstName.fill('test');
        await this.lastName.fill('test');
        await this.postalCode.fill('123456');
    }

    /**
     * Clicks the continue button to proceed to order summary
     *
     * @async
     * @returns Promise<void>
     *
     * @example
     * await checkoutPage.clickContinue();
     */
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    /* -----------------------------------------------------------------------
     * CHECKOUT STEP 3: COMPLETE ORDER
     * ----------------------------------------------------------------------- */

    /**
     * Clicks the finish button to complete the order
     *
     * @async
     * @returns Promise<void>
     *
     * @example
     * await checkoutPage.finishOperation();
     */
    async finishOperation(): Promise<void> {
        await this.finishButton.click();
    }

    /* -----------------------------------------------------------------------
     * VERIFICATION ACTIONS
     * ----------------------------------------------------------------------- */

    /**
     * Verifies the order completion confirmation message is displayed
     *
     * Waits for the "Thank you for your order!" message to appear,
     * indicating successful order placement.
     *
     * @async
     * @returns Promise<void>
     *
     * @example
     * await checkoutPage.verifyFinalStatement();
     */
    async verifyFinalStatement(): Promise<void> {
        await this.verifyOrderFinalStatement.waitFor({ state: 'visible' });
    }
}