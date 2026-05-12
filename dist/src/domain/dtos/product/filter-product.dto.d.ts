import { Gender } from '../../types/gender.type';
export type SortBy = 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'best-selling';
export declare class FilterProductDto {
    readonly search?: string | undefined;
    readonly categoryId?: string | undefined;
    readonly brandId?: string | undefined;
    readonly colorId?: string | undefined;
    readonly sizeId?: string | undefined;
    readonly materialId?: string | undefined;
    readonly tagId?: string | undefined;
    readonly discountId?: string | undefined;
    readonly gender?: Gender | undefined;
    readonly minPrice?: number | undefined;
    readonly maxPrice?: number | undefined;
    readonly inStock?: boolean | undefined;
    readonly sortBy?: SortBy | undefined;
    constructor(search?: string | undefined, categoryId?: string | undefined, brandId?: string | undefined, colorId?: string | undefined, sizeId?: string | undefined, materialId?: string | undefined, tagId?: string | undefined, discountId?: string | undefined, gender?: Gender | undefined, minPrice?: number | undefined, maxPrice?: number | undefined, inStock?: boolean | undefined, sortBy?: SortBy | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, FilterProductDto?];
}
//# sourceMappingURL=filter-product.dto.d.ts.map