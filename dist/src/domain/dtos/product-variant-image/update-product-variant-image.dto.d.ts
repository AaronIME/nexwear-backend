export declare class UpdateProductVariantImageDto {
    readonly id: string;
    readonly url?: string | undefined;
    readonly order?: number | undefined;
    constructor(id: string, url?: string | undefined, order?: number | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, UpdateProductVariantImageDto?];
}
//# sourceMappingURL=update-product-variant-image.dto.d.ts.map