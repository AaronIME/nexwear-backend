export class UpdateProductVariantDto {
  constructor(
    public readonly id: string,
    public readonly sku?: string,
    public readonly stock?: number,
    public readonly colorId?: string,
    public readonly sizeId?: string,
    public readonly price?: number,
    public readonly isActive?: boolean,
    public readonly isDeleted?: boolean,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, UpdateProductVariantDto?] {
    const { id, sku, stock, colorId, sizeId, price, isActive, isDeleted } = object;

    if (!id) return ['Id property is required'];
    if (sku !== undefined && (typeof sku !== 'string' || sku.trim().length === 0)) {
      return ['Sku must be a non-empty string'];
    }
    if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
      return ['Stock must be a non-negative integer'];
    }
    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
      return ['Price must be a non-negative number'];
    }

    if (isActive !== undefined && typeof isActive !== 'boolean') return ['IsActive must be a boolean'];
    if (isDeleted !== undefined && typeof isDeleted !== 'boolean') return ['IsDeleted must be a boolean'];

    return [
      undefined,
      new UpdateProductVariantDto(
        id,
        sku !== undefined ? sku.trim().toUpperCase() : undefined,
        stock !== undefined ? Math.floor(stock) : undefined,
        colorId,
        sizeId,
        price,
        isActive,
        isDeleted,
      ),
    ];
  }
}
