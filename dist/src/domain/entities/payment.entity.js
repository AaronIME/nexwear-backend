"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class PaymentEntity {
    id;
    orderId;
    method;
    status;
    amount;
    transactionId;
    constructor(id, orderId, method, status, amount, transactionId) {
        this.id = id;
        this.orderId = orderId;
        this.method = method;
        this.status = status;
        this.amount = amount;
        this.transactionId = transactionId;
    }
    static fromObject(object) {
        const { id, _id, orderId, method, status, amount, transactionId } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('Payment id is missing');
        if (!orderId)
            throw custom_error_1.CustomError.badRequest('Payment orderId is missing');
        if (!method)
            throw custom_error_1.CustomError.badRequest('Payment method is missing');
        if (!status)
            throw custom_error_1.CustomError.badRequest('Payment status is missing');
        if (amount === undefined || amount === null)
            throw custom_error_1.CustomError.badRequest('Payment amount is missing');
        return new PaymentEntity(id ?? _id, orderId, method, status, amount, transactionId);
    }
}
exports.PaymentEntity = PaymentEntity;
//# sourceMappingURL=payment.entity.js.map