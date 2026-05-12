"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaymentDto = void 0;
const payment_status_type_1 = require("../../types/payment-status.type");
const validStatuses = Object.values(payment_status_type_1.PaymentStatus);
class UpdatePaymentDto {
    id;
    status;
    transactionId;
    constructor(id, status, transactionId) {
        this.id = id;
        this.status = status;
        this.transactionId = transactionId;
    }
    static create(object) {
        const { id, status, transactionId } = object;
        if (!id)
            return ['Id property is required'];
        if (status !== undefined && !validStatuses.includes(status)) {
            return [`Status must be one of: ${validStatuses.join(', ')}`];
        }
        return [undefined, new UpdatePaymentDto(id, status, transactionId)];
    }
}
exports.UpdatePaymentDto = UpdatePaymentDto;
//# sourceMappingURL=update-payment.dto.js.map