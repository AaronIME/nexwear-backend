import { Gender } from '../types/gender.type';
import { BrandEntity } from './brand.entity';
import { CategoryEntity } from './category.entity';
import { DiscountEntity } from './discount.entity';
import { ProductImageEntity } from './product-image.entity';
export declare class ProductListEntity {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly finalPrice: number;
    readonly gender: Gender;
    readonly averageRating: number;
    readonly reviewCount: number;
    readonly soldCount: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly brand?: BrandEntity | undefined;
    readonly category?: CategoryEntity | undefined;
    readonly discount?: DiscountEntity | undefined;
    readonly firstImage?: ProductImageEntity | undefined;
    constructor(id: string, name: string, description: string, price: number, finalPrice: number, gender: Gender, averageRating: number, reviewCount: number, soldCount: number, createdAt: Date, updatedAt: Date, brand?: BrandEntity | undefined, category?: CategoryEntity | undefined, discount?: DiscountEntity | undefined, firstImage?: ProductImageEntity | undefined);
    static fromObject(object: {
        [key: string]: any;
    }): ProductListEntity;
    private static calculateFinalPrice;
}
//# sourceMappingURL=product-list.entity.d.ts.map