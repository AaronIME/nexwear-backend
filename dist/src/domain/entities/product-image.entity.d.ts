export declare class ProductImageEntity {
    readonly id: string;
    readonly productId: string;
    readonly url: string;
    readonly order: number;
    constructor(id: string, productId: string, url: string, order: number);
    static fromObject(object: {
        [key: string]: any;
    }): ProductImageEntity;
}
//# sourceMappingURL=product-image.entity.d.ts.map