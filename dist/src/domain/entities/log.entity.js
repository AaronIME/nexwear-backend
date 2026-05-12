"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class LogEntity {
    id;
    level;
    message;
    service;
    timestamp;
    constructor(id, level, message, service, timestamp) {
        this.id = id;
        this.level = level;
        this.message = message;
        this.service = service;
        this.timestamp = timestamp;
    }
    static fromObject(object) {
        const { id, _id, level, message, service, timestamp } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('Log id is missing');
        if (!level)
            throw custom_error_1.CustomError.badRequest('Log level is missing');
        if (!message)
            throw custom_error_1.CustomError.badRequest('Log message is missing');
        if (!service)
            throw custom_error_1.CustomError.badRequest('Log service is missing');
        if (!timestamp)
            throw custom_error_1.CustomError.badRequest('Log timestamp is missing');
        return new LogEntity(id ?? _id, level, message, service, new Date(timestamp));
    }
}
exports.LogEntity = LogEntity;
//# sourceMappingURL=log.entity.js.map