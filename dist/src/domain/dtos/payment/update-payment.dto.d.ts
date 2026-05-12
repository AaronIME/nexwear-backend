import { PaymentStatus } from '../../types/payment-status.type';
export declare class UpdatePaymentDto {
    readonly id: string;
    readonly status?: PaymentStatus | undefined;
    readonly transactionId?: string | undefined;
    constructor(id: string, status?: PaymentStatus | undefined, transactionId?: string | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, UpdatePaymentDto?];
}
//# sourceMappingURL=update-payment.dto.d.ts.map