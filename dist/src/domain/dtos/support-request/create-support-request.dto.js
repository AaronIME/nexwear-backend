"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSupportRequestDto = void 0;
class CreateSupportRequestDto {
    userId;
    subject;
    message;
    constructor(userId, subject, message) {
        this.userId = userId;
        this.subject = subject;
        this.message = message;
    }
    static create(object) {
        const { userId, subject, message } = object;
        if (!userId)
            return ['UserId property is required'];
        if (!subject)
            return ['Subject property is required'];
        if (typeof subject !== 'string' || subject.trim().length === 0)
            return ['Subject must be a non-empty string'];
        if (!message)
            return ['Message property is required'];
        if (typeof message !== 'string' || message.trim().length === 0)
            return ['Message must be a non-empty string'];
        return [undefined, new CreateSupportRequestDto(userId, subject.trim(), message.trim())];
    }
}
exports.CreateSupportRequestDto = CreateSupportRequestDto;
//# sourceMappingURL=create-support-request.dto.js.map