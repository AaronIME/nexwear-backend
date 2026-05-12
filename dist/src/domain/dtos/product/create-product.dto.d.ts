import { Gender } from '../../types/gender.type';
export declare class CreateProductDto {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly gender: Gender;
    readonly brandId?: string | undefined;
    readonly categoryId?: string | undefined;
    readonly discountId?: string | undefined;
    readonly tagIds?: string[] | undefined;
    readonly materialIds?: string[] | undefined;
    constructor(name: string, description: string, price: number, gender: Gender, brandId?: string | undefined, categoryId?: string | undefined, discountId?: string | undefined, tagIds?: string[] | undefined, materialIds?: string[] | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, CreateProductDto?];
}
//# sourceMappingURL=create-product.dto.d.ts.map