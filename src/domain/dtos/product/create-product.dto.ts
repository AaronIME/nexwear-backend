import { Gender } from '../../types/gender.type';

export class CreateProductDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly gender: Gender,
    public readonly brandId?: string,
    public readonly categoryId?: string,
    public readonly discountId?: string,
    public readonly tagIds?: string[],
    public readonly materialIds?: string[],
    public readonly isActive?: boolean,
    public readonly isDeleted?: boolean,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, CreateProductDto?] {
    const {
      name,
      description,
      price,
      gender,
      brandId,
      categoryId,
      discountId,
      tagIds,
      materialIds,
      isActive = true,
      isDeleted = false,
    } = object;

    if (!name) return ['Name property is required'];
    if (typeof name !== 'string' || name.trim().length === 0) return ['Name must be a non-empty string'];

    if (!description) return ['Description property is required'];
    if (typeof description !== 'string' || description.trim().length === 0) {
      return ['Description must be a non-empty string'];
    }

    if (price === undefined || price === null) return ['Price property is required'];
    if (typeof price !== 'number' || price < 0) return ['Price must be a non-negative number'];

    if (!gender) return ['Gender property is required'];
    if (!Object.values(Gender).includes(gender)) {
      return [`Gender must be one of: ${Object.values(Gender).join(', ')}`];
    }

    if (tagIds !== undefined && !Array.isArray(tagIds)) return ['TagIds must be an array'];
    if (materialIds !== undefined && !Array.isArray(materialIds)) return ['MaterialIds must be an array'];

    if (isActive !== undefined && typeof isActive !== 'boolean') return ['IsActive must be a boolean'];
    if (isDeleted !== undefined && typeof isDeleted !== 'boolean') return ['IsDeleted must be a boolean'];

    return [
      undefined,
      new CreateProductDto(
        name.trim(),
        description.trim(),
        price,
        gender as Gender,
        brandId,
        categoryId,
        discountId,
        tagIds,
        materialIds,
        isActive,
        isDeleted,
      ),
    ];
  }
}
