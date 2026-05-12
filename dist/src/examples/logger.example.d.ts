/**
 * Example: How to use the Winston Logger
 *
 * This example demonstrates how to use the buildLogger function
 * to create a logger instance for your service.
 */
/**
 * The logger will automatically:
 * 1. Save logs to PostgreSQL database
 * 2. Write to console with formatted output
 * 3. Save to info.log (info level only)
 * 4. Save to error.log (error level only)
 * 5. Save to combined.log (all levels)
 *
 * Each log entry includes:
 * - level: 'info' or 'error'
 * - message: The log message
 * - service: The service name you provided
 * - timestamp: Automatically added by Winston
 */
export declare class ExampleUserService {
    private readonly logger;
    createUser(name: string, email: string): Promise<void>;
}
//# sourceMappingURL=logger.example.d.ts.map