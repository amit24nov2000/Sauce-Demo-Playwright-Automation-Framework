/**
 * ============================================================================
 * PLAYWRIGHT CONFIGURATION FILE
 * ============================================================================
 *
 * This file contains the main configuration for the Playwright test framework.
 * It defines test execution settings, browser configurations, and reporting options.
 *
 * @see https://playwright.dev/docs/test-configuration
 * @author Sauce Demo Automation Team
 * ============================================================================
 */

import { defineConfig, devices } from '@playwright/test';
import sendEmail from './send-email';

/**
 * Optional: Load environment variables from .env file
 * Uncomment the lines below to enable dotenv configuration
 *
 * @see https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Playwright Test Configuration
 *
 * Exports the main configuration object that controls:
 * - Test directory location
 * - Parallel execution settings
 * - Retry policies
 * - Reporter configurations
 * - Browser/device settings
 * - Project-specific configurations
 */
export default defineConfig({

  /* -------------------------------------------------------------------------
   * TEST EXECUTION SETTINGS
   * ------------------------------------------------------------------------- */

  /** Directory containing test files */
  testDir: './tests',

  /** Enable parallel test execution across files for faster runs */
  fullyParallel: true,

  /**
   * Fail CI builds if test.only() is accidentally committed
   * This prevents focused tests from being deployed
   */
  forbidOnly: !!process.env.CI,

  /**
   * Retry configuration:
   * - CI environment: Retry failed tests up to 2 times
   * - Local environment: No retries for faster feedback
   */
  retries: process.env.CI ? 2 : 0,

  /**
   * Worker configuration:
   * - CI environment: Single worker for consistent results
   * - Local environment: Auto-detect based on CPU cores
   */
  workers: process.env.CI ? 1 : undefined,

  /* -------------------------------------------------------------------------
   * REPORTER CONFIGURATION
   * ------------------------------------------------------------------------- */

  /**
   * Test reporters for generating output:
   * 1. HTML Reporter - Built-in Playwright HTML report
   * 2. Monocart Reporter - Enhanced reporting with email notifications
   *
   * @see https://playwright.dev/docs/test-reporters
   */
  reporter: [
    ['html'],
    ['monocart-reporter', {
      /** Report title displayed in the output */
      name: 'Playwright Automation Report',

      /** Output path for the Monocart HTML report */
      outputFile: './monocart-report/index.html',

      /** Enable code coverage collection */
      codeCoverage: true,

      /**
       * Post-test hook to send email notifications
       * Triggers after all tests complete
       *
       * @param reportData - Test execution results and metadata
       * @param helper - Monocart helper utilities
       */
      onEnd: async (reportData: any, helper: any) => {
        await sendEmail(reportData, helper);
      }
    }]
  ],

  /* -------------------------------------------------------------------------
   * SHARED TEST OPTIONS
   * ------------------------------------------------------------------------- */

  /**
   * Common settings applied to all test projects
   * @see https://playwright.dev/docs/api/class-testoptions
   */
  use: {
    /**
     * Base URL for navigation actions
     * Uncomment and set for your application
     */
    // baseURL: 'http://localhost:3000',

    /**
     * Trace collection policy:
     * - 'retain-on-failure': Only save traces for failed tests
     * - Traces help debug failures with screenshots, DOM snapshots, and network logs
     *
     * @see https://playwright.dev/docs/trace-viewer
     */
    trace: 'retain-on-failure',
  },

  /* -------------------------------------------------------------------------
   * PROJECT CONFIGURATIONS
   * ------------------------------------------------------------------------- */

  /**
   * Test projects define different execution contexts
   * Each project can have unique browser, viewport, or authentication settings
   */
  projects: [
    /**
     * SETUP PROJECT
     *
     * Purpose: Perform initial authentication and save session state
     * This project runs first and stores credentials for other projects
     */
    {
      name: 'setup',
      testMatch: ['**/Login.spec.ts']
    },

    /**
     * AUTHENTICATED PROJECT
     *
     * Purpose: Run main test suite with pre-authenticated session
     * Dependencies: Requires 'setup' project to complete first
     * Browser: Desktop Chrome with saved authentication state
     */
    {
      name: 'authenticated',
      testMatch: ['**/tests/**/*.spec.ts'],
      use: {
        ...devices['Desktop Chrome'],
        /** Load saved authentication state from setup project */
        storageState: 'storage/auth.json'
      },
      dependencies: ['setup']
    },

    /* -----------------------------------------------------------------------
     * MOBILE VIEWPORT CONFIGURATIONS (Commented)
     * Uncomment to enable mobile device testing
     * ----------------------------------------------------------------------- */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* -----------------------------------------------------------------------
     * BRANDED BROWSER CONFIGURATIONS (Commented)
     * Uncomment to test against specific browser installations
     * ----------------------------------------------------------------------- */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* -------------------------------------------------------------------------
   * LOCAL DEVELOPMENT SERVER (Optional)
   * ------------------------------------------------------------------------- */

  /**
   * Uncomment to start a local development server before tests
   * Useful for testing local applications
   */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
