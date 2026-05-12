import { PaymentMethod } from '../types/payment-method.type';
import { PaymentStatus } from '../types/payment-status.type';
export declare class PaymentEntity {
    readonly id: string;
    readonly orderId: string;
    readonly method: PaymentMethod;
    readonly status: PaymentStatus;
    readonly amount: number;
    readonly transactionId?: string | undefined;
    constructor(id: string, orderId: string, method: PaymentMethod, status: PaymentStatus, amount: number, transactionId?: string | undefined);
    static fromObject(object: {
        [key: string]: any;
    }): PaymentEntity;
}
//# sourceMappingURL=payment.entity.d.ts.map