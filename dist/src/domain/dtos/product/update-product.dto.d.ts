import { Gender } from '../../types/gender.type';
export declare class UpdateProductDto {
    readonly id: string;
    readonly name?: string | undefined;
    readonly description?: string | undefined;
    readonly price?: number | undefined;
    readonly gender?: Gender | undefined;
    readonly brandId?: string | undefined;
    readonly categoryId?: string | undefined;
    readonly discountId?: string | undefined;
    readonly tagIds?: string[] | undefined;
    readonly materialIds?: string[] | undefined;
    readonly soldCount?: number | undefined;
    constructor(id: string, name?: string | undefined, description?: string | undefined, price?: number | undefined, gender?: Gender | undefined, brandId?: string | undefined, categoryId?: string | undefined, discountId?: string | undefined, tagIds?: string[] | undefined, materialIds?: string[] | undefined, soldCount?: number | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, UpdateProductDto?];
}
//# sourceMappingURL=update-product.dto.d.ts.map