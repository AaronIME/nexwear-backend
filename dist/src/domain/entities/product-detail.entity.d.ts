import { Gender } from "../types/gender.type";
export declare class ProductDetailEntity {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly gender: Gender;
    readonly averageRating: number;
    readonly reviewCount: number;
    readonly ratingSum: number;
    readonly soldCount: number;
    readonly isActive: boolean;
    readonly isDeleted: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly brand?: any | undefined;
    readonly tags?: any[] | undefined;
    readonly colors?: any[] | undefined;
    readonly sizes?: any[] | undefined;
    readonly category?: any | undefined;
    readonly discount?: any | undefined;
    readonly images?: any[] | undefined;
    readonly variants?: any[] | undefined;
    readonly materials?: any[] | undefined;
    constructor(id: string, name: string, description: string, price: number, gender: Gender, averageRating: number, reviewCount: number, ratingSum: number, soldCount: number, isActive: boolean, isDeleted: boolean, createdAt: Date, updatedAt: Date, brand?: any | undefined, tags?: any[] | undefined, colors?: any[] | undefined, sizes?: any[] | undefined, category?: any | undefined, discount?: any | undefined, images?: any[] | undefined, variants?: any[] | undefined, materials?: any[] | undefined);
    static fromObject(object: {
        [key: string]: any;
    }): ProductDetailEntity;
}
//# sourceMappingURL=product-detail.entity.d.ts.map