"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLogDto = void 0;
const log_level_type_1 = require("../../types/log-level.type");
class CreateLogDto {
    level;
    message;
    service;
    constructor(level, message, service) {
        this.level = level;
        this.message = message;
        this.service = service;
    }
    static create(object) {
        const { level, message, service } = object;
        if (!level)
            return ['Level property is required'];
        if (!Object.values(log_level_type_1.LogLevel).includes(level))
            return [`Level must be one of: ${Object.values(log_level_type_1.LogLevel).join(', ')}`];
        if (!message)
            return ['Message property is required'];
        if (typeof message !== 'string' || message.trim().length === 0)
            return ['Message must be a non-empty string'];
        if (!service)
            return ['Service property is required'];
        if (typeof service !== 'string' || service.trim().length === 0)
            return ['Service must be a non-empty string'];
        return [undefined, new CreateLogDto(level, message.trim(), service.trim())];
    }
}
exports.CreateLogDto = CreateLogDto;
//# sourceMappingURL=create-log.dto.js.map