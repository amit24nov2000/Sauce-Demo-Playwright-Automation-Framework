/**
 * ============================================================================
 * FIXTURES INDEX - CENTRAL FIXTURE AGGREGATOR
 * ============================================================================
 *
 * This module serves as the central entry point for all custom Playwright fixtures.
 * It combines multiple fixture modules into a single, unified test export that
 * can be imported by test files.
 *
 * @module Fixtures/Index
 * @description Merges all custom fixtures into a single test export
 *
 * Included Fixtures:
 * - ApiClient: Provides API request context for backend operations
 * - PomObjects: Provides Page Object Model instances
 * - AddProductsInCart: Provides test data for product operations
 *
 * @example
 * // In test files, import the unified test:
 * import { test } from '../../Fixtures/Index';
 *
 * test('my test', async ({ apiClient, productsPage, productsToAdd }) => {
 *   // All fixtures are available here
 * });
 * ============================================================================
 */

import { mergeTests } from "@playwright/test";

// Import individual fixture modules
import { test as apiClient } from './BaseFixtures/ApiClient';
import { test as pomObjects } from './BaseFixtures/PomObjects';
import { test as addProductsInCart } from './DataFixtures/AddProductsInCart';
import { test as mockApiRoutes } from './DataFixtures/MockApiRoutes';

/**
 * Unified Test Export
 *
 * Combines all fixture modules using Playwright's mergeTests utility.
 * This creates a single test function that has access to all custom fixtures.
 *
 * Available fixtures after merge:
 * - apiClient: APIRequestContext for API testing
 * - loginPage: LoginPage POM instance
 * - productsPage: ProductsPage POM instance
 * - checkoutPage: CheckoutPage POM instance
 * - productsToAdd: Array of product names from test data
 * - mockApiRoutes: Array of mock route configurations for API mocking
 */
export const test = mergeTests(apiClient, pomObjects, addProductsInCart, mockApiRoutes);