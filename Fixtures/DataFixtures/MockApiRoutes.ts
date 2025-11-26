/**
 * ============================================================================
 * MOCK API ROUTES - DATA FIXTURE
 * ============================================================================
 * 
 * This module provides a data-driven fixture for API mocking in tests.
 * It loads mock route configurations from a JSON file and makes them
 * available to tests as a fixture, enabling data-driven API mocking.
 * 
 * @module Fixtures/DataFixtures/MockApiRoutes
 * @description Provides test data fixture for API mocking operations
 * 
 * Data Source: storage/JsonPayloads/MockApiRoutes.json
 * 
 * @example
 * test('Mock API', async ({ page, mockApiRoutes }) => {
 *   await mockApis(page, mockApiRoutes);
 *   // API calls will now return mocked responses
 * });
 * ============================================================================
 */

import { test as baseTest } from '@playwright/test';
import { MockApiRoutes, MockRouteConfig } from '../../Types/Fixtures/DataFixtures/MockApiRoutes';
import fs from 'fs';

/** Path to the JSON file containing mock route configurations */
const MOCK_ROUTES_DATA_PATH = 'storage/JsonPayloads/MockApiRoutes.json';

/**
 * Extended Test with Mock API Routes Fixture
 * 
 * Extends the base Playwright test with a mockApiRoutes fixture
 * that provides an array of mock route configurations loaded from JSON.
 */
export const test = baseTest.extend<MockApiRoutes>({
    
    /**
     * Mock API Routes Fixture
     * 
     * Loads mock route configurations from a JSON file and provides them
     * as an array of MockRouteConfig objects. This enables data-driven
     * API mocking where configurations are externalized.
     * 
     * @param use - Playwright fixture use function
     * 
     * @example
     * // JSON file content defines the mock routes
     * // Fixture provides: MockRouteConfig[]
     */
    mockApiRoutes: async ({}, use) => {
        // Read and parse the JSON data file
        const fileContent = fs.readFileSync(MOCK_ROUTES_DATA_PATH, 'utf8');
        const routesData: MockApiRoutes = JSON.parse(fileContent);
        
        // Provide the mock routes array to the test
        await use(routesData.mockApiRoutes as MockRouteConfig[]);
    },
});

