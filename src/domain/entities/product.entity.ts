import { CustomError } from './errors/custom.error';
import { Gender } from '../types/gender.type';

export class ProductEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly gender: Gender,
    public readonly averageRating: number,
    public readonly reviewCount: number,
    public readonly ratingSum: number,
    public readonly soldCount: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly isActive: boolean,
    public readonly isDeleted: boolean,
    public readonly brandId?: string,
    public readonly categoryId?: string,
    public readonly discountId?: string,
  ) {}

  static fromObject(object: { [key: string]: any }): ProductEntity {
    const {
      id,
      _id,
      name,
      description,
      price,
      gender,
      averageRating,
      reviewCount,
      ratingSum,
      soldCount,
      createdAt,
      updatedAt,
      isActive = true,
      isDeleted = false,
      brandId,
      categoryId,
      discountId,
    } = object;

    if (!id && !_id) throw CustomError.badRequest('Product id is missing');
    if (!name) throw CustomError.badRequest('Product name is missing');
    if (!description) throw CustomError.badRequest('Product description is missing');
    if (price === undefined || price === null) throw CustomError.badRequest('Product price is missing');
    if (!gender) throw CustomError.badRequest('Product gender is missing');

    return new ProductEntity(
      id ?? _id,
      name,
      description,
      price,
      gender as Gender,
      averageRating ?? 0,
      reviewCount ?? 0,
      ratingSum ?? 0,
      soldCount ?? 0,
      new Date(createdAt),
      new Date(updatedAt),
      Boolean(isActive),
      Boolean(isDeleted),
      brandId,
      categoryId,
      discountId,
    );
  }
}
