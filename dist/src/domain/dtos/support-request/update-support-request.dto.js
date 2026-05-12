"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSupportRequestDto = void 0;
const support_status_type_1 = require("../../types/support-status.type");
const validStatuses = Object.values(support_status_type_1.SupportStatus);
class UpdateSupportRequestDto {
    id;
    status;
    constructor(id, status) {
        this.id = id;
        this.status = status;
    }
    static create(object) {
        const { id, status } = object;
        if (!id)
            return ['Id property is required'];
        if (!status)
            return ['Status property is required'];
        if (!validStatuses.includes(status)) {
            return [`Status must be one of: ${validStatuses.join(', ')}`];
        }
        return [undefined, new UpdateSupportRequestDto(id, status)];
    }
}
exports.UpdateSupportRequestDto = UpdateSupportRequestDto;
//# sourceMappingURL=update-support-request.dto.js.map