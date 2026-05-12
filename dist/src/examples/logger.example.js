"use strict";
/**
 * Example: How to use the Winston Logger
 *
 * This example demonstrates how to use the buildLogger function
 * to create a logger instance for your service.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleUserService = void 0;
const winston_adapter_1 = require("../config/adapters/winston.adapter");
// Create a logger instance for your service
// The service name should be the file/module name where you're using the logger
const logger = (0, winston_adapter_1.buildLogger)('UserService');
// Log informational messages
logger.info('User created successfully');
logger.info('Processing user data');
// Log error messages
logger.error('Failed to create user');
logger.error('Database connection failed');
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
// Example in a real service:
class ExampleUserService {
    logger = (0, winston_adapter_1.buildLogger)('ExampleUserService');
    async createUser(name, email) {
        try {
            this.logger.info(`Creating user: ${email}`);
            // ... your business logic here
            this.logger.info(`User created successfully: ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to create user: ${email} - ${error}`);
            throw error;
        }
    }
}
exports.ExampleUserService = ExampleUserService;
//# sourceMappingURL=logger.example.js.map