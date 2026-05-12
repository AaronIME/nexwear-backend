"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportRequestEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class SupportRequestEntity {
    id;
    userId;
    subject;
    message;
    status;
    createdAt;
    constructor(id, userId, subject, message, status, createdAt) {
        this.id = id;
        this.userId = userId;
        this.subject = subject;
        this.message = message;
        this.status = status;
        this.createdAt = createdAt;
    }
    static fromObject(object) {
        const { id, _id, userId, subject, message, status, createdAt } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('SupportRequest id is missing');
        if (!userId)
            throw custom_error_1.CustomError.badRequest('SupportRequest userId is missing');
        if (!subject)
            throw custom_error_1.CustomError.badRequest('SupportRequest subject is missing');
        if (!message)
            throw custom_error_1.CustomError.badRequest('SupportRequest message is missing');
        if (!status)
            throw custom_error_1.CustomError.badRequest('SupportRequest status is missing');
        return new SupportRequestEntity(id ?? _id, userId, subject, message, status, new Date(createdAt));
    }
}
exports.SupportRequestEntity = SupportRequestEntity;
//# sourceMappingURL=support-request.entity.js.map