import { PaymentMethod } from '../../types/payment-method.type';
export declare class CreatePaymentDto {
    readonly orderId: string;
    readonly method: PaymentMethod;
    readonly amount: number;
    readonly transactionId?: string | undefined;
    constructor(orderId: string, method: PaymentMethod, amount: number, transactionId?: string | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, CreatePaymentDto?];
}
//# sourceMappingURL=create-payment.dto.d.ts.map