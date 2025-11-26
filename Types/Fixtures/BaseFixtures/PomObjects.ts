/**
 * ============================================================================
 * PAGE OBJECT MODEL TYPE DEFINITIONS
 * ============================================================================
 *
 * This module defines the TypeScript types for all Page Object Model fixtures.
 * It ensures type safety when using POM fixtures in tests and provides
 * IntelliSense support for page object methods and properties.
 *
 * @module Types/Fixtures/BaseFixtures/PomObjects
 * @description Type definitions for POM fixture objects
 * ============================================================================
 */

import { CheckoutPage } from "../../../Pom/CheckoutPage";
import { LoginPage } from "../../../Pom/LoginPage";
import { ProductsPage } from "../../../Pom/ProductsPage";

/**
 * PomObjects Fixture Type
 *
 * Defines the shape of the Page Object Model fixtures object.
 * Used to extend Playwright's base test with type-safe page objects.
 *
 * @property loginPage - Instance of LoginPage for authentication operations
 * @property productsPage - Instance of ProductsPage for product/cart operations
 * @property checkoutPage - Instance of CheckoutPage for checkout workflow
 *
 * @example
 * // Usage in fixture extension:
 * export const test = baseTest.extend<PomObjects>({
 *   loginPage: async ({ page }, use) => { ... },
 *   productsPage: async ({ page }, use) => { ... },
 *   checkoutPage: async ({ page }, use) => { ... }
 * });
 */
export type PomObjects = {
    /** Page object for login/authentication operations */
    loginPage: LoginPage;

    /** Page object for product browsing and cart management */
    productsPage: ProductsPage;

    /** Page object for checkout process handling */
    checkoutPage: CheckoutPage;
};