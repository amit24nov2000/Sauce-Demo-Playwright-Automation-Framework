/**
 * ============================================================================
 * API ROUTER - MOCK API UTILITIES
 * ============================================================================
 *
 * This module provides utilities for mocking API responses during Playwright tests.
 * It allows tests to intercept network requests and return custom responses,
 * enabling isolated testing without backend dependencies.
 *
 * @module Utilities/ApiRouter
 * @description API mocking utilities for network interception
 *
 * @example
 * // Mock a single API endpoint
 * await mockApis(page, [{
 *   url: '** /api/products',  // Use glob pattern (no space in actual code)
 *   method: 'GET',
 *   body: { products: [] },
 *   status: 200
 * }]);
 * ============================================================================
 */

import { Page } from '@playwright/test';

/* ---------------------------------------------------------------------------
 * TYPE DEFINITIONS
 * --------------------------------------------------------------------------- */

/**
 * MockRoute Configuration Type
 *
 * Defines the structure for configuring a mocked API route.
 * Each MockRoute specifies how to intercept and respond to a specific request.
 *
 * @property url - URL pattern to match (supports glob patterns like '** /api/*')
 * @property method - HTTP method to match (GET, POST, PUT, DELETE, etc.)
 * @property body - Response body (object will be JSON stringified, string used as-is)
 * @property status - HTTP status code (optional, defaults to 200)
 * @property contentType - Response content type (optional, defaults to 'application/json')
 *
 * @example
 * const route: MockRoute = {
 *   url: '** /api/cart',  // Use glob pattern (no space in actual code)
 *   method: 'POST',
 *   body: { success: true, cartId: '123' },
 *   status: 201
 * };
 */
export type MockRoute = {
    /** URL pattern to intercept (supports glob patterns) */
    url: string;

    /** HTTP method to match (GET, POST, PUT, DELETE, etc.) */
    method: string;

    /** Response body - object or string */
    body: any;

    /** HTTP status code (default: 200) */
    status?: number;

    /** Response content type (default: 'application/json') */
    contentType?: string;
};

/* ---------------------------------------------------------------------------
 * MOCK API FUNCTIONS
 * --------------------------------------------------------------------------- */

/**
 * Mock Multiple API Endpoints
 *
 * Sets up route handlers to intercept and mock multiple API endpoints.
 * This function iterates through the provided routes and configures
 * Playwright's network interception for each one.
 *
 * @async
 * @param page - Playwright Page object for route interception
 * @param routes - Array of MockRoute configurations
 * @returns Promise<void>
 *
 * @example
 * // Mock multiple endpoints
 * await mockApis(page, [
 *   {
 *     url: '** /api/products',  // Use glob pattern (no space in actual code)
 *     method: 'GET',
 *     body: { products: [{ id: 1, name: 'Product 1' }] }
 *   },
 *   {
 *     url: '** /api/cart',  // Use glob pattern (no space in actual code)
 *     method: 'POST',
 *     body: { success: true },
 *     status: 201
 *   }
 * ]);
 *
 * @remarks
 * - Routes are processed in order; first matching route wins
 * - Non-matching methods will continue to the real endpoint
 * - Response bodies are automatically JSON stringified if not already strings
 */
export async function mockApis(page: Page, routes: MockRoute[]): Promise<void> {
    // Iterate through each route configuration
    for (const route of routes) {
        // Set up route handler for the URL pattern
        await page.route(route.url, async (routeHandler) => {
            // Check if HTTP method matches (if specified)
            if (route.method && routeHandler.request().method() !== route.method) {
                // Method doesn't match - continue to real endpoint
                return routeHandler.continue();
            }

            // Prepare response body
            // If body is already a string, use as-is; otherwise JSON stringify
            const responseBody = typeof route.body === 'string'
                ? route.body
                : JSON.stringify(route.body, null, 2);

            // Fulfill the request with mocked response
            await routeHandler.fulfill({
                status: route.status ?? 200,                    // Default: 200 OK
                contentType: route.contentType ?? 'application/json',  // Default: JSON
                body: responseBody,
            });
        });
    }
}
