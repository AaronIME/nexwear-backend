import { OrderStatus } from '../types/order-status.type';
export declare class OrderEntity {
    readonly id: string;
    readonly userId: string;
    readonly street: string;
    readonly city: string;
    readonly state: string;
    readonly country: string;
    readonly postalCode: string;
    readonly subtotal: number;
    readonly tax: number;
    readonly discount: number;
    readonly shipping: number;
    readonly total: number;
    readonly status: OrderStatus;
    readonly createdAt: Date;
    constructor(id: string, userId: string, street: string, city: string, state: string, country: string, postalCode: string, subtotal: number, tax: number, discount: number, shipping: number, total: number, status: OrderStatus, createdAt: Date);
    static fromObject(object: {
        [key: string]: any;
    }): OrderEntity;
}
//# sourceMappingURL=order.entity.d.ts.map