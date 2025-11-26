/**
 * ============================================================================
 * MOCK API ROUTES TYPE DEFINITION
 * ============================================================================
 * 
 * This module defines the TypeScript types for the Mock API Routes fixture.
 * It ensures type safety for mock route configurations loaded from JSON files.
 * 
 * @module Types/Fixtures/DataFixtures/MockApiRoutes
 * @description Type definitions for API mocking test data
 * ============================================================================
 */

/**
 * MockRouteConfig Type
 * 
 * Defines the structure for a single mock route configuration.
 * This matches the MockRoute type from ApiRouter but is used for fixture data.
 * 
 * @property url - URL pattern to intercept (supports glob patterns)
 * @property method - HTTP method to match (GET, POST, PUT, DELETE, etc.)
 * @property body - Response body object
 * @property status - HTTP status code (optional, defaults to 200)
 * @property contentType - Response content type (optional, defaults to 'application/json')
 */
export type MockRouteConfig = {
    /** URL pattern to intercept (supports glob patterns) */
    url: string;
    
    /** HTTP method to match (GET, POST, PUT, DELETE, etc.) */
    method: string;
    
    /** Response body object */
    body: Record<string, unknown>;
    
    /** HTTP status code (default: 200) */
    status?: number;
    
    /** Response content type (default: 'application/json') */
    contentType?: string;
};

/**
 * MockApiRoutes Fixture Type
 * 
 * Defines the shape of the mock API routes fixture object.
 * Used to extend Playwright's base test with type-safe mock route data.
 * 
 * @property mockApiRoutes - Array of mock route configurations
 * 
 * @example
 * // Usage in tests:
 * test('Mock API test', async ({ mockApiRoutes }) => {
 *   await mockApis(page, mockApiRoutes);
 * });
 */
export type MockApiRoutes = {
    /** 
     * Array of mock route configurations
     * Each route defines how to intercept and respond to API requests
     */
    mockApiRoutes: MockRouteConfig[];
};

