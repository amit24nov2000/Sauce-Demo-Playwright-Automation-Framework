/**
 * ============================================================================
 * PRODUCTS PAGE - PAGE OBJECT MODEL
 * ============================================================================
 *
 * This class encapsulates all interactions with the Sauce Demo products/inventory page.
 * It provides methods for browsing products, managing the shopping cart, and
 * verifying cart contents.
 *
 * @class ProductsPage
 * @description Handles product browsing and cart management operations
 * @see https://www.saucedemo.com/inventory.html
 * ============================================================================
 */

import { expect, Locator, Page } from "@playwright/test";

export class ProductsPage {

    /* -----------------------------------------------------------------------
     * LOCATORS
     * These properties define the page elements for product interactions
     * ----------------------------------------------------------------------- */

    /** Default add to cart button (Sauce Labs Backpack) */
    readonly addToCart: Locator;

    /** Main page heading displaying "Swag Labs" logo/text */
    readonly swagLabsHeading: Locator;

    /** Shopping cart icon/button in the header */
    readonly cartButton: Locator;

    /** Badge showing the number of items in cart */
    readonly shoppingCartBadge: Locator;

    /** Default remove button (Sauce Labs Backpack) */
    readonly removeButton: Locator;

    /* -----------------------------------------------------------------------
     * CONSTRUCTOR
     * ----------------------------------------------------------------------- */

    /**
     * Creates an instance of ProductsPage
     *
     * @param page - Playwright Page object for browser interactions
     *
     * @example
     * const productsPage = new ProductsPage(page);
     */
    constructor(private page: Page) {
        // Initialize locators for product page elements
        this.addToCart = page.getByTestId('add-to-cart-sauce-labs-backpack');
        this.swagLabsHeading = page.getByText('Swag Labs');
        this.cartButton = page.locator(`//*[@data-test="shopping-cart-link"]`);
        this.shoppingCartBadge = page.locator(`//*[@data-test="shopping-cart-badge"]`);
        this.removeButton = page.locator(`//*[@data-test="remove-sauce-labs-backpack"]`);
    }

    /* -----------------------------------------------------------------------
     * NAVIGATION ACTIONS
     * ----------------------------------------------------------------------- */

    /**
     * Navigates to the Sauce Demo inventory/products page
     *
     * Waits for the page heading to be visible before proceeding,
     * ensuring the page has fully loaded.
     *
     * @async
     * @returns Promise<void>
     *
     * @example
     * await productsPage.gotoSauceDemoWebsite();
     */
    async gotoSauceDemoWebsite(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
        await this.swagLabsHeading.waitFor({ state: 'visible' });
    }

    /* -----------------------------------------------------------------------
     * CART ACTIONS
     * ----------------------------------------------------------------------- */

    /**
     * Adds multiple products to the shopping cart
     *
     * Iterates through the provided product list and clicks the "Add to cart"
     * button for each item. Product names are converted to lowercase and
     * formatted to match the data-test attribute pattern.
     *
     * @async
     * @param itemList - Array of product names to add (e.g., ["Sauce-Labs-Backpack"])
     * @returns Promise<void>
     *
     * @example
     * await productsPage.addToCartItems(['Sauce-Labs-Backpack', 'Sauce-Labs-Bike-Light']);
     *
     * @remarks
     * Product names should match the format used in data-test attributes
     * (hyphenated, case-insensitive)
     */
    async addToCartItems(itemList: string[]): Promise<void> {
        for (const product of itemList) {
            const item = product.toLowerCase();
            console.log(`[ProductsPage] Adding to cart: ${item}`);

            const button = this.page.locator(`//*[@data-test="add-to-cart-${item}"]`);

            if (await button.isVisible()) {
                await button.click();
            } else {
                console.warn(`[ProductsPage] Add to cart button not found for: ${item}`);
            }
        }
    }

    /**
     * Removes multiple products from the shopping cart
     *
     * Iterates through the provided product list and clicks the "Remove"
     * button for each item currently in the cart.
     *
     * @async
     * @param items - Array of product names to remove
     * @returns Promise<void>
     *
     * @example
     * await productsPage.removeProductsFromCart(['Sauce-Labs-Backpack']);
     */
    async removeProductsFromCart(items: string[]): Promise<void> {
        for (const product of items) {
            const item = product.toLowerCase();
            console.log(`[ProductsPage] Removing from cart: ${item}`);

            const button = this.page.locator(`//*[@data-test="remove-${item}"]`);

            if (await button.isVisible()) {
                await button.click();
            } else {
                console.warn(`[ProductsPage] Remove button not found for: ${item}`);
            }
        }
    }

    /**
     * Clicks on the shopping cart button to navigate to cart page
     *
     * @async
     * @returns Promise<void>
     *
     * @example
     * await productsPage.clickOnCartButton();
     */
    async clickOnCartButton(): Promise<void> {
        await this.cartButton.click();
    }

    /* -----------------------------------------------------------------------
     * VERIFICATION ACTIONS
     * ----------------------------------------------------------------------- */

    /**
     * Verifies the shopping cart badge displays the expected item count
     *
     * @async
     * @param count - Expected number of items in the cart
     * @returns Promise<void>
     * @throws AssertionError if the badge count doesn't match
     *
     * @example
     * await productsPage.verifyShoppingCartBadgeCount(3);
     */
    async verifyShoppingCartBadgeCount(count: number): Promise<void> {
        await expect(this.shoppingCartBadge).toHaveText(`${count}`);
    }
}