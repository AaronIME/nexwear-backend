export declare class UpdateProductImageDto {
    readonly id: string;
    readonly url?: string | undefined;
    readonly order?: number | undefined;
    constructor(id: string, url?: string | undefined, order?: number | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, UpdateProductImageDto?];
}
//# sourceMappingURL=update-product-image.dto.d.ts.map