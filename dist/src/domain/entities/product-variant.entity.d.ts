export declare class ProductVariantEntity {
    readonly id: string;
    readonly productId: string;
    readonly sku: string;
    readonly stock: number;
    readonly soldCount: number;
    readonly isActive: boolean;
    readonly isDeleted: boolean;
    readonly colorId?: string | undefined;
    readonly sizeId?: string | undefined;
    readonly price?: number | undefined;
    readonly image?: string | undefined;
    readonly color?: string | undefined;
    readonly size?: string | undefined;
    constructor(id: string, productId: string, sku: string, stock: number, soldCount: number, isActive: boolean, isDeleted: boolean, colorId?: string | undefined, sizeId?: string | undefined, price?: number | undefined, image?: string | undefined, color?: string | undefined, size?: string | undefined);
    static fromObject(object: {
        [key: string]: any;
    }): ProductVariantEntity;
}
//# sourceMappingURL=product-variant.entity.d.ts.map