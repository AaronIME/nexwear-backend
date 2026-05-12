export declare class AddCartItemDto {
    readonly cartId: string;
    readonly productVariantId: string;
    readonly quantity: number;
    constructor(cartId: string, productVariantId: string, quantity: number);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, AddCartItemDto?];
}
//# sourceMappingURL=add-cart-item.dto.d.ts.map