/**
 * ============================================================================
 * API CLIENT TYPE DEFINITION
 * ============================================================================
 *
 * This module defines the TypeScript type for the API Client fixture.
 * It ensures type safety when using the apiClient fixture in tests.
 *
 * @module Types/Fixtures/BaseFixtures/ApiClient
 * @description Type definition for API request context fixture
 * ============================================================================
 */

import { APIRequestContext } from "@playwright/test";

/**
 * ApiClient Fixture Type
 *
 * Defines the shape of the API client fixture object.
 * Used to extend Playwright's base test with type-safe API capabilities.
 *
 * @property apiClient - Playwright's APIRequestContext for making HTTP requests
 *
 * @example
 * // Usage in fixture extension:
 * export const test = baseTest.extend<ApiClient>({
 *   apiClient: async ({}, use) => { ... }
 * });
 */
export type ApiClient = {
    /** Playwright API request context for HTTP operations */
    apiClient: APIRequestContext;
};