import { Gender } from '../../types/gender.type';

export type SortBy = 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'best-selling';

export class FilterProductDto {
  constructor(
    public readonly search?: string,
    public readonly categoryId?: string,
    public readonly brandId?: string,
    public readonly colorId?: string,
    public readonly sizeId?: string,
    public readonly materialId?: string,
    public readonly tagId?: string,
    public readonly discountId?: string,
    public readonly gender?: Gender,
    public readonly minPrice?: number,
    public readonly maxPrice?: number,
    public readonly inStock?: boolean,
    public readonly sortBy?: SortBy,
    public readonly isActive?: boolean,
    public readonly isDeleted?: boolean,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, FilterProductDto?] {
    const {
      search,
      categoryId,
      brandId,
      colorId,
      sizeId,
      materialId,
      tagId,
      discountId,
      gender,
      minPrice,
      maxPrice,
      inStock,
      sortBy,
      isActive,
      isDeleted,
    } = object;

    if (minPrice !== undefined && (isNaN(Number(minPrice)) || Number(minPrice) < 0)) {
      return ['MinPrice must be a non-negative number'];
    }
    if (maxPrice !== undefined && (isNaN(Number(maxPrice)) || Number(maxPrice) < 0)) {
      return ['MaxPrice must be a non-negative number'];
    }
    if (minPrice !== undefined && maxPrice !== undefined && Number(minPrice) > Number(maxPrice)) {
      return ['MinPrice cannot be greater than MaxPrice'];
    }
    if (gender !== undefined && !Object.values(Gender).includes(gender)) {
      return [`Gender must be one of: ${Object.values(Gender).join(', ')}`];
    }

    const validSortOptions: SortBy[] = ['newest', 'price-asc', 'price-desc', 'rating', 'best-selling'];
    if (sortBy !== undefined && !validSortOptions.includes(sortBy)) {
      return [`SortBy must be one of: ${validSortOptions.join(', ')}`];
    }

    const parseBool = (v: unknown): boolean | undefined => {
      if (v === undefined) return undefined;
      if (typeof v === 'boolean') return v;
      if (v === 'true') return true;
      if (v === 'false') return false;
      return undefined;
    };

    const isActiveParsed = parseBool(isActive);
    const isDeletedParsed = parseBool(isDeleted);

    if (isActive !== undefined && isActiveParsed === undefined) {
      return ['IsActive must be a boolean'];
    }
    if (isDeleted !== undefined && isDeletedParsed === undefined) {
      return ['IsDeleted must be a boolean'];
    }

    return [
      undefined,
      new FilterProductDto(
        search,
        categoryId,
        brandId,
        colorId,
        sizeId,
        materialId,
        tagId,
        discountId,
        gender as Gender | undefined,
        minPrice !== undefined ? Number(minPrice) : undefined,
        maxPrice !== undefined ? Number(maxPrice) : undefined,
        inStock !== undefined ? inStock === 'true' || inStock === true : undefined,
        sortBy as SortBy | undefined,
        isActiveParsed,
        isDeletedParsed,
      ),
    ];
  }
}
