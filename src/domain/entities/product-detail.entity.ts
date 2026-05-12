import { CustomError } from "./errors/custom.error";
import { Gender } from "../types/gender.type";
import { BrandEntity } from "./brand.entity";
import { CategoryEntity } from "./category.entity";
import { DiscountEntity } from "./discount.entity";
import { MaterialEntity } from "./material.entity";
import { ProductImageEntity } from "./product-image.entity";
import { ProductVariantEntity } from "./product-variant.entity";
import { TagEntity } from "./tag.entity";
import { ColorEntity } from "./color.entity";
import { SizeEntity } from "./size.entity";

export class ProductDetailEntity {
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
    public readonly isActive: boolean,
    public readonly isDeleted: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly brand?: any,
    public readonly tags?: any[],
    public readonly colors?: any[],
    public readonly sizes?: any[],
    public readonly category?: any,
    public readonly discount?: any,
    public readonly images?: any[],
    public readonly variants?: any[],
    public readonly materials?: any[]
  ) {}

  static fromObject(object: { [key: string]: any }): ProductDetailEntity {
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
      isActive = true,
      isDeleted = false,
      createdAt,
      updatedAt,
      brand,
      category,
      discount,
      images,
      variants,
      materials,
      tags,
      colors,
      sizes,
    } = object;

    if (!id && !_id) throw CustomError.badRequest("Product id is missing");
    if (!name) throw CustomError.badRequest("Product name is missing");
    if (!description)
      throw CustomError.badRequest("Product description is missing");
    if (price === undefined || price === null)
      throw CustomError.badRequest("Product price is missing");
    if (!gender) throw CustomError.badRequest("Product gender is missing");

    return new ProductDetailEntity(
      id ?? _id,
      name,
      description,
      price,
      gender as Gender,
      averageRating ?? 0,
      reviewCount ?? 0,
      ratingSum ?? 0,
      soldCount ?? 0,
      Boolean(isActive),
      Boolean(isDeleted),
      new Date(createdAt),
      new Date(updatedAt),
      brand ? BrandEntity.fromObject(brand) : undefined,
      tags?.map((tag: unknown) =>
        TagEntity.fromObject((tag as { tag: Parameters<typeof TagEntity.fromObject>[0] }).tag),
      ) ?? [],
      (variants ?? [])
        .filter((variant: unknown) => (variant as { color?: unknown }).color)
        .map((variant: unknown) =>
          ColorEntity.fromObject((variant as { color: Parameters<typeof ColorEntity.fromObject>[0] }).color),
        ),
      (variants ?? [])
        .filter((variant: unknown) => (variant as { size?: unknown }).size)
        .map((variant: unknown) =>
          SizeEntity.fromObject((variant as { size: Parameters<typeof SizeEntity.fromObject>[0] }).size),
        ),
      category ? CategoryEntity.fromObject(category) : undefined,
      discount ? DiscountEntity.fromObject(discount) : undefined,
      images ? images.map(ProductImageEntity.fromObject) : undefined,
      variants ? variants.map(ProductVariantEntity.fromObject) : undefined,
      materials
        ? materials.map((material: unknown) =>
            MaterialEntity.fromObject((material as { material: Parameters<typeof MaterialEntity.fromObject>[0] }).material),
          )
        : undefined,
    );
  }
}
