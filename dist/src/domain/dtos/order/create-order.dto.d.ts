export interface OrderItemInput {
    productVariantId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    readonly userId: string;
    readonly addressId: string;
    readonly items: OrderItemInput[];
    readonly tax: number;
    readonly discount: number;
    readonly shipping: number;
    constructor(userId: string, addressId: string, items: OrderItemInput[], tax: number, discount: number, shipping: number);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, CreateOrderDto?];
}
//# sourceMappingURL=create-order.dto.d.ts.map