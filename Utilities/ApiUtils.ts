/**
 * ============================================================================
 * API UTILITIES
 * ============================================================================
 *
 * This module provides utility methods for interacting with the Sauce Demo API.
 * It encapsulates common API operations and provides error handling and
 * response validation.
 *
 * @class ApiUtils
 * @description Utility class for API operations
 *
 * @example
 * const apiUtils = new ApiUtils(apiClient);
 * await apiUtils.addProductsInCart();
 * ============================================================================
 */

import { APIRequestContext, expect } from "@playwright/test";

export class ApiUtils {

    /* -----------------------------------------------------------------------
     * PROPERTIES
     * ----------------------------------------------------------------------- */

    /** Playwright API request context for making HTTP requests */
    private apiClient: APIRequestContext;

    /* -----------------------------------------------------------------------
     * CONSTRUCTOR
     * ----------------------------------------------------------------------- */

    /**
     * Creates an instance of ApiUtils
     *
     * @param apiClient - Playwright APIRequestContext for HTTP operations
     *
     * @example
     * const apiUtils = new ApiUtils(apiClient);
     */
    constructor(apiClient: APIRequestContext) {
        this.apiClient = apiClient;
    }

    /* -----------------------------------------------------------------------
     * CART OPERATIONS
     * ----------------------------------------------------------------------- */

    /**
     * Adds a product to the shopping cart via API
     *
     * Makes a POST request to the cart/add endpoint to add a product.
     * Currently hardcoded to add product with ID 1.
     *
     * @async
     * @returns Promise<void>
     * @throws Error if the API request fails or returns non-OK status
     *
     * @example
     * await apiUtils.addProductsInCart();
     *
     * @todo Accept productId as a parameter for flexibility
     * @todo Return the response data for further processing
     */
    async addProductsInCart(): Promise<void> {
        let parsedResponse;

        try {
            // Make POST request to add product to cart
            const response = await this.apiClient.post('/cart/add', {
                data: {
                    productId: 1
                }
            });

            // Parse the JSON response
            parsedResponse = await response.json();

            // Verify the request was successful
            expect(response.ok()).toBeTruthy();

            console.log('[ApiUtils] Product added to cart successfully');

        } catch (error) {
            console.error('[ApiUtils] Failed to add products to cart');
            console.error('[ApiUtils] Response:', parsedResponse);
            throw error;
        }
    }
}