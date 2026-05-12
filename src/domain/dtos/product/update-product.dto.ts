import { Gender } from '../../types/gender.type';

export class UpdateProductDto {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly description?: string,
    public readonly price?: number,
    public readonly gender?: Gender,
    public readonly brandId?: string,
    public readonly categoryId?: string,
    public readonly discountId?: string,
    public readonly tagIds?: string[],
    public readonly materialIds?: string[],
    public readonly soldCount?: number,
    public readonly isActive?: boolean,
    public readonly isDeleted?: boolean,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, UpdateProductDto?] {
    const {
      id,
      name,
      description,
      price,
      gender,
      brandId,
      categoryId,
      discountId,
      tagIds,
      materialIds,
      soldCount,
      isActive,
      isDeleted,
    } = object;

    if (!id) return ['Id property is required'];

    if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
      return ['Name must be a non-empty string'];
    }
    if (description !== undefined && (typeof description !== 'string' || description.trim().length === 0)) {
      return ['Description must be a non-empty string'];
    }
    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
      return ['Price must be a non-negative number'];
    }
    if (gender !== undefined && !Object.values(Gender).includes(gender)) {
      return [`Gender must be one of: ${Object.values(Gender).join(', ')}`];
    }
    if (tagIds !== undefined && !Array.isArray(tagIds)) return ['TagIds must be an array'];
    if (materialIds !== undefined && !Array.isArray(materialIds)) return ['MaterialIds must be an array'];
    if (soldCount !== undefined && (typeof soldCount !== 'number' || soldCount < 0)) {
      return ['SoldCount must be a non-negative number'];
    }

    if (isActive !== undefined && typeof isActive !== 'boolean') return ['IsActive must be a boolean'];
    if (isDeleted !== undefined && typeof isDeleted !== 'boolean') return ['IsDeleted must be a boolean'];

    return [
      undefined,
      new UpdateProductDto(
        id,
        name?.trim(),
        description?.trim(),
        price,
        gender as Gender | undefined,
        brandId,
        categoryId,
        discountId,
        tagIds,
        materialIds,
        soldCount,
        isActive,
        isDeleted,
      ),
    ];
  }
}
