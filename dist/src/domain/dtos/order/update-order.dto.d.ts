import { OrderStatus } from '../../types/order-status.type';
export declare class UpdateOrderDto {
    readonly id: string;
    readonly status: OrderStatus;
    constructor(id: string, status: OrderStatus);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, UpdateOrderDto?];
}
//# sourceMappingURL=update-order.dto.d.ts.map