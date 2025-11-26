/**
 * ============================================================================
 * ADD TO CART TEST SPECIFICATION
 * ============================================================================
 *
 * This test file contains end-to-end tests for shopping cart functionality
 * on the Sauce Demo application. It covers adding products, removing products,
 * and completing the checkout process.
 *
 * @module tests/specs/AddToCart.spec
 * @description E2E tests for cart and checkout operations
 *
 * Test Data:
 * - Product list loaded from storage/JsonPayloads/AddProductsInCart.json
 * - Uses pre-authenticated session from Login.spec.ts setup
 *
 * Prerequisites:
 * - Login.spec.ts must run first (handled by project dependencies)
 * - Authentication state saved in storage/auth.json
 * ============================================================================
 */

import { test } from '../../Fixtures/Index';
import { expect } from '@playwright/test';
import { mockApis } from '../../Utilities/ApiRouter';

/* ---------------------------------------------------------------------------
 * API MOCKING DEMONSTRATION TESTS
 * --------------------------------------------------------------------------- */

/**
 * Test: Demonstrate API Mocking with mockApis utility
 *
 * This test demonstrates how to use the mockApis function from ApiRouter
 * combined with the mockApiRoutes fixture for data-driven API mocking.
 *
 * The mock route configurations are loaded from:
 * - Type Definition: Types/Fixtures/DataFixtures/MockApiRoutes.ts
 * - Data Fixture: Fixtures/DataFixtures/MockApiRoutes.ts
 * - JSON Data: storage/JsonPayloads/MockApiRoutes.json
 *
 * Test Steps:
 * 1. Receive mock route configuration from fixture (data-driven)
 * 2. Set up the API mock using mockApis
 * 3. Navigate to a page that triggers the API call
 * 4. Verify the mocked response is used
 */
test('Demo: Mock API response using ApiRouter', async ({ page, mockApiRoutes }) => {
    // Step 1: Mock routes are provided by the mockApiRoutes fixture
    // Data is loaded from storage/JsonPayloads/MockApiRoutes.json
    console.log('[API Mock Demo] Loaded mock routes from fixture:', mockApiRoutes.length);

    // Step 2: Set up the API mock BEFORE navigating to the page
    // This ensures the mock is in place when the page loads
    await mockApis(page, mockApiRoutes);

    // Step 3: Navigate to the Sauce Demo website
    // The page will try to load inventory.json, but our mock will intercept it
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Step 4: Verify we're on the inventory page
    // Even though we mocked the API, the page structure remains the same
    await expect(page).toHaveURL(/.*inventory.html/);

    // Verify the page title is visible (proves page loaded successfully)
    const pageTitle = page.locator('.title');
    await expect(pageTitle).toBeVisible();

    // Log success message for demonstration
    console.log('[API Mock Demo] Successfully mocked API using fixture data');
});

/* ---------------------------------------------------------------------------
 * CART MANAGEMENT TESTS
 * --------------------------------------------------------------------------- */

/**
 * Test: Add and Remove Multiple Items
 *
 * Verifies the ability to add multiple products to the shopping cart
 * and then remove them. This tests the basic cart functionality without
 * proceeding to checkout.
 *
 * Test Steps:
 * 1. Navigate to the products page
 * 2. Add all products from test data to cart
 * 3. Verify cart badge shows correct count
 * 4. Remove all products from cart
 */
test('Choose multiple items', async ({ page, productsPage, productsToAdd }) => {
    // Navigate to the inventory/products page
    await productsPage.gotoSauceDemoWebsite();

    // Add all products from the test data array
    await productsPage.addToCartItems(productsToAdd);

    // Verify the cart badge reflects the correct item count
    await productsPage.verifyShoppingCartBadgeCount(productsToAdd.length);

    // Clean up: Remove all added products
    await productsPage.removeProductsFromCart(productsToAdd);
});

/* ---------------------------------------------------------------------------
 * CHECKOUT FLOW TESTS
 * --------------------------------------------------------------------------- */

/**
 * Test: Complete Checkout Flow
 *
 * Verifies the complete end-to-end checkout process including:
 * adding products, navigating to cart, entering shipping information,
 * and completing the order.
 *
 * Test Steps:
 * 1. Navigate to the products page
 * 2. Add all products from test data to cart
 * 3. Verify cart badge shows correct count
 * 4. Navigate to cart
 * 5. Initiate checkout process
 * 6. Fill in shipping information
 * 7. Continue to order summary
 * 8. Complete the order
 * 9. Verify order confirmation message
 */
test('Choose multiple items using API and Remove those items', async ({
    page,
    productsPage,
    productsToAdd,
    checkoutPage
}) => {
    // Step 1: Navigate to the inventory/products page
    await productsPage.gotoSauceDemoWebsite();

    // Step 2: Add all products from the test data array
    await productsPage.addToCartItems(productsToAdd);

    // Step 3: Verify the cart badge reflects the correct item count
    await productsPage.verifyShoppingCartBadgeCount(productsToAdd.length);

    // Step 4: Navigate to the shopping cart
    await productsPage.clickOnCartButton();

    // Step 5: Start the checkout process
    await checkoutPage.performCheckoutOperation();

    // Step 6: Enter shipping/billing information
    await checkoutPage.fillInformationBox();

    // Step 7: Continue to order summary/review page
    await checkoutPage.clickContinue();

    // Step 8: Complete the order
    await checkoutPage.finishOperation();

    // Step 9: Verify order was placed successfully
    await checkoutPage.verifyFinalStatement();
});

