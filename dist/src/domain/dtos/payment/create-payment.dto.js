"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentDto = void 0;
const payment_method_type_1 = require("../../types/payment-method.type");
const validMethods = Object.values(payment_method_type_1.PaymentMethod);
class CreatePaymentDto {
    orderId;
    method;
    amount;
    transactionId;
    constructor(orderId, method, amount, transactionId) {
        this.orderId = orderId;
        this.method = method;
        this.amount = amount;
        this.transactionId = transactionId;
    }
    static create(object) {
        const { orderId, method, amount, transactionId } = object;
        if (!orderId)
            return ['OrderId property is required'];
        if (!method)
            return ['Method property is required'];
        if (!validMethods.includes(method)) {
            return [`Method must be one of: ${validMethods.join(', ')}`];
        }
        if (amount === undefined || amount === null)
            return ['Amount property is required'];
        if (typeof amount !== 'number' || amount <= 0)
            return ['Amount must be a positive number'];
        return [undefined, new CreatePaymentDto(orderId, method, amount, transactionId)];
    }
}
exports.CreatePaymentDto = CreatePaymentDto;
//# sourceMappingURL=create-payment.dto.js.map