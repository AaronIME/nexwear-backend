import { Gender } from '../types/gender.type';
export declare class ProductEntity {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly gender: Gender;
    readonly averageRating: number;
    readonly reviewCount: number;
    readonly ratingSum: number;
    readonly soldCount: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly isActive: boolean;
    readonly isDeleted: boolean;
    readonly brandId?: string | undefined;
    readonly categoryId?: string | undefined;
    readonly discountId?: string | undefined;
    constructor(id: string, name: string, description: string, price: number, gender: Gender, averageRating: number, reviewCount: number, ratingSum: number, soldCount: number, createdAt: Date, updatedAt: Date, isActive: boolean, isDeleted: boolean, brandId?: string | undefined, categoryId?: string | undefined, discountId?: string | undefined);
    static fromObject(object: {
        [key: string]: any;
    }): ProductEntity;
}
//# sourceMappingURL=product.entity.d.ts.map