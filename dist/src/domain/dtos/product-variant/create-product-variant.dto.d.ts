export declare class CreateProductVariantDto {
    readonly productId: string;
    readonly sku: string;
    readonly stock: number;
    readonly colorId?: string | undefined;
    readonly sizeId?: string | undefined;
    readonly price?: number | undefined;
    constructor(productId: string, sku: string, stock: number, colorId?: string | undefined, sizeId?: string | undefined, price?: number | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, CreateProductVariantDto?];
}
//# sourceMappingURL=create-product-variant.dto.d.ts.map