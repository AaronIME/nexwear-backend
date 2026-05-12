/** Ítem en respuestas de órdenes (snapshot almacenado en BD, sin joins a variant/product) */
export declare class OrderItemLineEntity {
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
    static fromSnapshotRow(row: {
        id: string;
        orderId: string;
        productId?: string | null;
        productVariantId?: string | null;
        imageUrl: string;
        colorName: string;
        sizeName: string;
        productName: string;
        quantity: number;
        price: number;
    }): OrderItemLineEntity;
}
//# sourceMappingURL=order-item-line.entity.d.ts.map