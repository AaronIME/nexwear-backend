import { OrderStatus } from '../types/order-status.type';
import { PaymentEntity } from './payment.entity';
import { OrderItemLineEntity } from './order-item-line.entity';
/** Pedido para listados / detalle: dirección embebida, totales desglosados, pago opcional */
export declare class OrderWithDetailsEntity {
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
    readonly payment: PaymentEntity | null;
    readonly items: OrderItemLineEntity[];
    constructor(id: string, userId: string, street: string, city: string, state: string, country: string, postalCode: string, subtotal: number, tax: number, discount: number, shipping: number, total: number, status: OrderStatus, createdAt: Date, payment: PaymentEntity | null, items: OrderItemLineEntity[]);
    static fromAggregate(order: {
        id: string;
        userId: string;
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        subtotal: number;
        tax: number;
        discount: number;
        shipping: number;
        total: number;
        status: OrderStatus | string;
        createdAt: Date;
        payment: {
            [key: string]: unknown;
        } | null;
        items: Array<Parameters<typeof OrderItemLineEntity.fromSnapshotRow>[0]>;
    }): OrderWithDetailsEntity;
}
//# sourceMappingURL=order-with-details.entity.d.ts.map