/**
 * ============================================================================
 * ADD PRODUCTS TO CART - DATA FIXTURE
 * ============================================================================
 *
 * This module provides a data-driven fixture for product testing.
 * It loads product data from a JSON file and makes it available
 * to tests as a fixture, enabling data-driven test patterns.
 *
 * @module Fixtures/DataFixtures/AddProductsInCart
 * @description Provides test data fixture for product cart operations
 *
 * Data Source: storage/JsonPayloads/AddProductsInCart.json
 *
 * @example
 * test('Add products', async ({ productsToAdd }) => {
 *   console.log(productsToAdd); // ['Sauce-Labs-Backpack', 'Sauce-Labs-Bike-Light']
 *   await productsPage.addToCartItems(productsToAdd);
 * });
 * ============================================================================
 */

import { test as baseTest } from '@playwright/test';
import { AddProductsInCart } from '../../Types/Fixtures/DataFixtures/AddProductsInCart';
import fs from 'fs';

/** Path to the JSON file containing product test data */
const PRODUCTS_DATA_PATH = 'storage/JsonPayloads/AddProductsInCart.json';

/**
 * Extended Test with Product Data Fixture
 *
 * Extends the base Playwright test with a productsToAdd fixture
 * that provides an array of product names loaded from JSON.
 */
export const test = baseTest.extend<AddProductsInCart>({

    /**
     * Products To Add Fixture
     *
     * Loads product names from a JSON file and provides them as a string array.
     * This enables data-driven testing where test data is externalized
     * and can be modified without changing test code.
     *
     * @param use - Playwright fixture use function
     *
     * @example
     * // JSON file content: { "productsToAdd": ["Sauce-Labs-Backpack"] }
     * // Fixture provides: ["Sauce-Labs-Backpack"]
     */
    productsToAdd: async ({}, use) => {
        // Read and parse the JSON data file
        const fileContent = fs.readFileSync(PRODUCTS_DATA_PATH, 'utf8');
        const productsData: AddProductsInCart = JSON.parse(fileContent);

        // Provide the products array to the test
        await use(productsData.productsToAdd);
    },
});