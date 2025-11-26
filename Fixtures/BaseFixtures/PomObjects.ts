/**
 * ============================================================================
 * PAGE OBJECT MODEL FIXTURES
 * ============================================================================
 *
 * This module provides custom Playwright fixtures for Page Object Model (POM) classes.
 * It automatically instantiates page objects and injects them into tests,
 * eliminating boilerplate code and ensuring proper page object lifecycle management.
 *
 * @module Fixtures/BaseFixtures/PomObjects
 * @description Provides POM instance fixtures for all page classes
 *
 * Available Fixtures:
 * - loginPage: LoginPage instance for authentication operations
 * - productsPage: ProductsPage instance for product browsing and cart management
 * - checkoutPage: CheckoutPage instance for checkout workflow
 *
 * @example
 * test('POM test', async ({ loginPage, productsPage, checkoutPage }) => {
 *   await loginPage.Login('user', 'password');
 *   await productsPage.addToCartItems(['Sauce-Labs-Backpack']);
 *   await checkoutPage.performCheckoutOperation();
 * });
 * ============================================================================
 */

import { test as baseTest } from '@playwright/test';
import { PomObjects } from '../../Types/Fixtures/BaseFixtures/PomObjects';
import { LoginPage } from '../../Pom/LoginPage';
import { ProductsPage } from '../../Pom/ProductsPage';
import { CheckoutPage } from '../../Pom/CheckoutPage';

/**
 * Extended Test with POM Fixtures
 *
 * Extends the base Playwright test with page object fixtures.
 * Each fixture creates a new instance of the corresponding page class,
 * injecting the Playwright page object automatically.
 */
export const test = baseTest.extend<PomObjects>({

    /**
     * Login Page Fixture
     *
     * Provides an instance of LoginPage for authentication operations.
     *
     * @param page - Playwright Page object (automatically injected)
     * @param use - Playwright fixture use function
     */
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    /**
     * Products Page Fixture
     *
     * Provides an instance of ProductsPage for product browsing
     * and shopping cart management operations.
     *
     * @param page - Playwright Page object (automatically injected)
     * @param use - Playwright fixture use function
     */
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

    /**
     * Checkout Page Fixture
     *
     * Provides an instance of CheckoutPage for handling
     * the complete checkout workflow.
     *
     * @param page - Playwright Page object (automatically injected)
     * @param use - Playwright fixture use function
     */
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    }
});