export declare class UpdateProductVariantDto {
    readonly id: string;
    readonly sku?: string | undefined;
    readonly stock?: number | undefined;
    readonly colorId?: string | undefined;
    readonly sizeId?: string | undefined;
    readonly price?: number | undefined;
    constructor(id: string, sku?: string | undefined, stock?: number | undefined, colorId?: string | undefined, sizeId?: string | undefined, price?: number | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, UpdateProductVariantDto?];
}
//# sourceMappingURL=update-product-variant.dto.d.ts.map