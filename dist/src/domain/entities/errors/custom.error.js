"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    statusCode;
    message;
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
    static badRequest = (message) => {
        return new CustomError(400, message);
    };
    static unAuthorized = (message) => {
        return new CustomError(401, message);
    };
    static forbidden = (message) => {
        return new CustomError(403, message);
    };
    static notFound = (message) => {
        return new CustomError(404, message);
    };
    static internalServerError = (message) => {
        return new CustomError(500, message);
    };
}
exports.CustomError = CustomError;
//# sourceMappingURL=custom.error.js.map