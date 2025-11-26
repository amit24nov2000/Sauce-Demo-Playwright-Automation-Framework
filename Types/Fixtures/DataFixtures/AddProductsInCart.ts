/**
 * ============================================================================
 * ADD PRODUCTS IN CART TYPE DEFINITION
 * ============================================================================
 *
 * This module defines the TypeScript type for the product cart data fixture.
 * It ensures type safety for the test data loaded from JSON files.
 *
 * @module Types/Fixtures/DataFixtures/AddProductsInCart
 * @description Type definition for product cart test data
 * ============================================================================
 */

/**
 * AddProductsInCart Fixture Type
 *
 * Defines the shape of the product cart data object.
 * This type is used both for:
 * 1. The JSON file structure (storage/JsonPayloads/AddProductsInCart.json)
 * 2. The data fixture that provides products to tests
 *
 * @property productsToAdd - Array of product names in hyphenated format
 *
 * @example
 * // JSON file structure:
 * {
 *   "productsToAdd": ["Sauce-Labs-Backpack", "Sauce-Labs-Bike-Light"]
 * }
 *
 * @example
 * // Usage in tests:
 * test('Add products', async ({ productsToAdd }) => {
 *   await productsPage.addToCartItems(productsToAdd);
 * });
 */
export type AddProductsInCart = {
    /**
     * Array of product names to add to cart
     * Format: Hyphenated product names (e.g., "Sauce-Labs-Backpack")
     */
    productsToAdd: string[];
};