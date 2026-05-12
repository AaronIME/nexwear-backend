export declare class ProductVariantImageEntity {
    readonly id: string;
    readonly productVariantId: string;
    readonly url: string;
    readonly order: number;
    constructor(id: string, productVariantId: string, url: string, order: number);
    static fromObject(object: {
        [key: string]: any;
    }): ProductVariantImageEntity;
}
//# sourceMappingURL=product-variant-image.entity.d.ts.map