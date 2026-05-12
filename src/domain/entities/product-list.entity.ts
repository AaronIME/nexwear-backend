import { CustomError } from './errors/custom.error';
import { Gender } from '../types/gender.type';
import { BrandEntity } from './brand.entity';
import { CategoryEntity } from './category.entity';
import { DiscountEntity } from './discount.entity';
import { ProductImageEntity } from './product-image.entity';

export class ProductListEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly finalPrice: number,
    public readonly gender: Gender,
    public readonly averageRating: number,
    public readonly reviewCount: number,
    public readonly soldCount: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly isActive: boolean,
    public readonly isDeleted: boolean,
    public readonly brand?: BrandEntity,
    public readonly category?: CategoryEntity,
    public readonly discount?: DiscountEntity,
    public readonly firstImage?: ProductImageEntity,
  ) {}

  static fromObject(object: { [key: string]: any }): ProductListEntity {
    const {
      id,
      _id,
      name,
      description,
      price,
      gender,
      averageRating,
      reviewCount,
      soldCount,
      createdAt,
      updatedAt,
      isActive = true,
      isDeleted = false,
      brand,
      category,
      discount,
      images,
    } = object;

    if (!id && !_id) throw CustomError.badRequest('Product id is missing');
    if (!name) throw CustomError.badRequest('Product name is missing');
    if (!description) throw CustomError.badRequest('Product description is missing');
    if (price === undefined || price === null) throw CustomError.badRequest('Product price is missing');
    if (!gender) throw CustomError.badRequest('Product gender is missing');

    const finalPrice = ProductListEntity.calculateFinalPrice(price, discount);

    return new ProductListEntity(
      id ?? _id,
      name,
      description,
      price,
      finalPrice,
      gender as Gender,
      averageRating ?? 0,
      reviewCount ?? 0,
      soldCount ?? 0,
      new Date(createdAt),
      new Date(updatedAt),
      Boolean(isActive),
      Boolean(isDeleted),
      brand ? BrandEntity.fromObject(brand) : undefined,
      category ? CategoryEntity.fromObject(category) : undefined,
      discount ? DiscountEntity.fromObject(discount) : undefined,
      images && images.length > 0 ? ProductImageEntity.fromObject(images[0]) : undefined,
    );
  }

  private static calculateFinalPrice(price: number, discount?: any): number {
    if (!discount) return price;

    const now = new Date();
    const startDate = new Date(discount.startDate);
    const endDate = new Date(discount.endDate);

    const isValidDiscount = now >= startDate && now <= endDate;

    if (!isValidDiscount) return price;

    const discountAmount = price * (discount.percentage / 100);
    const finalPrice = price - discountAmount;

    return Math.round(finalPrice * 100) / 100;
  }
}