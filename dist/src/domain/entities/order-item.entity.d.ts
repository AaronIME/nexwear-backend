/** Línea de pedido persistida como snapshot en checkout */
export declare class OrderItemEntity {
    readonly id: string;
    readonly orderId: string;
    readonly productId: string | null;
    readonly productVariantId: string | null;
    readonly imageUrl: string;
    readonly colorName: string;
    readonly sizeName: string;
    readonly productName: string;
    readonly quantity: number;
    readonly price: number;
    constructor(id: string, orderId: string, productId: string | null, productVariantId: string | null, imageUrl: string, colorName: string, sizeName: string, productName: string, quantity: number, price: number);
    static fromObject(object: {
        [key: string]: any;
    }): OrderItemEntity;
}
//# sourceMappingURL=order-item.entity.d.ts.map