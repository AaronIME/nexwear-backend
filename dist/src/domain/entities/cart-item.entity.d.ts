import { ProductVariantEntity } from './product-variant.entity';
export declare class CartItemEntity {
    readonly id: string;
    readonly cartId: string;
    readonly productVariantId: string;
    readonly quantity: number;
    readonly productVariant?: ProductVariantEntity | undefined;
    readonly productName?: string | undefined;
    constructor(id: string, cartId: string, productVariantId: string, quantity: number, productVariant?: ProductVariantEntity | undefined, productName?: string | undefined);
    static fromObject(object: {
        [key: string]: any;
    }): CartItemEntity;
}
//# sourceMappingURL=cart-item.entity.d.ts.map