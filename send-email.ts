/**
 * ============================================================================
 * EMAIL NOTIFICATION SERVICE
 * ============================================================================
 *
 * This module handles sending automated email notifications with test reports
 * after Playwright test execution completes.
 *
 * Features:
 * - Gmail SMTP integration
 * - HTML-formatted test summary
 * - Report attachment support
 * - Multiple recipient support
 *
 * @module send-email
 * @requires eight-colors - Console color logging utility
 * @requires dotenv - Environment variable loader
 * ============================================================================
 */

import EC from 'eight-colors';
import dotenv from 'dotenv';

// Initialize environment variables from .env file
dotenv.config();

/* ---------------------------------------------------------------------------
 * TYPE DEFINITIONS
 * --------------------------------------------------------------------------- */

/**
 * Email Transport Configuration
 * Defines the SMTP service and authentication credentials
 */
interface EmailTransport {
    /** Email service provider (e.g., 'gmail', 'outlook') */
    service: string;
    /** Authentication credentials */
    auth: {
        /** Sender email address */
        user: string;
        /** App-specific password or OAuth token */
        pass: string;
    };
}

/**
 * Email Message Configuration
 * Defines the email content and recipients
 */
interface EmailMessage {
    /** Sender email address */
    from: string;
    /** Array of recipient email addresses */
    to: string[];
    /** Carbon copy recipients */
    cc: string;
    /** Blind carbon copy recipients */
    bcc: string;
    /** Email subject line */
    subject: string;
    /** File attachments array */
    attachments: Array<{ path: string }>;
    /** HTML body content */
    html: string;
}

/**
 * Complete Email Options Configuration
 * Combines transport and message settings
 */
interface EmailOptions {
    /** SMTP transport configuration */
    transport: EmailTransport;
    /** Email message content */
    message: EmailMessage;
}

/* ---------------------------------------------------------------------------
 * EMAIL SENDER FUNCTION
 * --------------------------------------------------------------------------- */

/**
 * Sends test report email notification
 *
 * This function is called by the Monocart reporter's onEnd hook
 * after all tests have completed execution.
 *
 * @async
 * @param reportData - Test execution report data from Monocart reporter
 * @param reportData.name - Report name/title
 * @param reportData.dateH - Human-readable execution date
 * @param reportData.durationH - Human-readable test duration
 * @param reportData.htmlPath - Path to the HTML report file
 * @param reportData.metadata - Test metadata (env, type, url)
 * @param reportData.summaryTable - HTML table with test summary
 * @param helper - Monocart helper object with email utilities
 * @returns Promise<void>
 *
 * @example
 * // Called automatically by Monocart reporter
 * onEnd: async (reportData, helper) => {
 *   await sendEmail(reportData, helper);
 * }
 */
export default async (reportData: any, helper: any): Promise<void> => {

    /* -----------------------------------------------------------------------
     * EMAIL CONFIGURATION
     * ----------------------------------------------------------------------- */

    const emailOptions: EmailOptions = {

        // SMTP Transport Settings
        transport: {
            service: 'gmail',
            auth: {
                // TODO: Update with your sender email address
                user: 'xyz@gmail.com',
                // Password loaded from environment variable for security
                pass: process.env.GMAIL_PASSWORD!
            }
        },

        // Email Message Content
        message: {
            // Sender address (should match transport.auth.user)
            from: 'xyz@gmail.com',

            // Recipients loaded from environment variables
            // Allows flexible configuration without code changes
            to: [
                process.env.EMAIL1 || '',
                process.env.EMAIL2 || '',
                process.env.EMAIL3 || '',
                process.env.EMAIL4 || ''
            ].filter(email => email !== ''), // Remove empty entries

            cc: '',   // Carbon copy recipients
            bcc: '',  // Blind carbon copy recipients

            // Dynamic subject with report name and date
            subject: `${reportData.name} - ${reportData.dateH}`,

            // Attach the full HTML report
            attachments: [{
                path: reportData.htmlPath
            }],

            // HTML email body with test summary
            html: `
                <h3>${reportData.name}</h3>
                <ul>
                    <li><strong>Environment:</strong> ${reportData.metadata.env}</li>
                    <li><strong>Type:</strong> ${reportData.metadata.type}</li>
                    <li><strong>URL:</strong> ${reportData.metadata.url}</li>
                    <li><strong>Date:</strong> ${reportData.dateH}</li>
                    <li><strong>Duration:</strong> ${reportData.durationH}</li>
                </ul>

                ${reportData.summaryTable}

                <p>Please check the attached HTML report for detailed results.</p>

                <p>Best regards,<br/>Automation Team</p>
            `
        }
    };

    /* -----------------------------------------------------------------------
     * VALIDATION & SENDING
     * ----------------------------------------------------------------------- */

    // Debug: Uncomment to log email HTML content
    // console.log('Email HTML:', emailOptions.message.html);

    // Validate that Gmail password is configured
    if (!emailOptions.transport.auth.pass) {
        EC.logRed('[Email Error] Gmail password not configured in environment variables');
        EC.logRed('[Email Error] Set GMAIL_PASSWORD in your .env file');
        return;
    }

    // Attempt to send the email
    try {
        const info = await helper.sendEmail(emailOptions);
        console.log('[Email Success] Report sent successfully:', info);
    } catch (error) {
        console.error('[Email Error] Failed to send report email:', error);
    }
};