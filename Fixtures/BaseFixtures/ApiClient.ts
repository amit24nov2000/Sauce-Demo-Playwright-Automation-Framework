/**
 * ============================================================================
 * API CLIENT FIXTURE
 * ============================================================================
 *
 * This module provides a custom Playwright fixture for API testing.
 * It creates a pre-configured API request context that can be used
 * alongside browser-based tests for hybrid testing scenarios.
 *
 * @module Fixtures/BaseFixtures/ApiClient
 * @description Provides API request context fixture for backend operations
 *
 * @example
 * test('API test', async ({ apiClient }) => {
 *   const response = await apiClient.post('/api/endpoint', { data: {} });
 *   expect(response.ok()).toBeTruthy();
 * });
 * ============================================================================
 */

import { request, test as baseTest } from '@playwright/test';
import { ApiClient } from '../../Types/Fixtures/BaseFixtures/ApiClient';

/**
 * Extended Test with API Client Fixture
 *
 * Extends the base Playwright test with an apiClient fixture
 * that provides a configured APIRequestContext for making HTTP requests.
 */
export const test = baseTest.extend<ApiClient>({

    /**
     * API Client Fixture
     *
     * Creates a new API request context with pre-configured settings
     * for the Sauce Demo API. The context includes common headers
     * and authentication token.
     *
     * @param use - Playwright fixture use function
     *
     * Configuration:
     * - Base URL: https://www.saucedemo.com
     * - Headers: Accept, Content-Type (JSON), Authorization (Bearer token)
     */
    apiClient: async ({}, use) => {
        // Create new API request context with configuration
        const client = await request.newContext({
            // Base URL for all API requests
            baseURL: 'https://www.saucedemo.com',

            // Common HTTP headers
            extraHTTPHeaders: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // Authorization token from environment variable
                'Authorization': `Bearer ${process.env.workerApiToken}`
            }
        });

        // Provide the client to the test
        await use(client);
    }
});