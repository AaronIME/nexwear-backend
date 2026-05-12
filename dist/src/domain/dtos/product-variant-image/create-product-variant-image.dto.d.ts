export declare class CreateProductVariantImageDto {
    readonly productVariantId: string;
    readonly url: string;
    readonly order: number;
    constructor(productVariantId: string, url: string, order: number);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, CreateProductVariantImageDto?];
}
//# sourceMappingURL=create-product-variant-image.dto.d.ts.map