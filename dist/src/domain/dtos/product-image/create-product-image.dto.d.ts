export declare class CreateProductImageDto {
    readonly productId: string;
    readonly url: string;
    readonly order: number;
    constructor(productId: string, url: string, order: number);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, CreateProductImageDto?];
}
//# sourceMappingURL=create-product-image.dto.d.ts.map