import { CustomError } from './errors/custom.error';

export class ProductVariantEntity {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly sku: string,
    public readonly stock: number,
    public readonly soldCount: number,
    public readonly isActive: boolean,
    public readonly isDeleted: boolean,
    public readonly colorId?: string,
    public readonly sizeId?: string,
    public readonly price?: number,
    public readonly image?: string,
    public readonly color?: string,
    public readonly size?: string,
  ) {}

  static fromObject(object: { [key: string]: any }): ProductVariantEntity {
    const {
      id,
      _id,
      productId,
      sku,
      stock = 0,
      soldCount = 0,
      isActive = true,
      isDeleted = false,
      colorId,
      sizeId,
      price,
      image,
      color,
      size,
    } = object;

    if (!id && !_id) throw CustomError.badRequest('ProductVariant id is missing');
    if (!productId) throw CustomError.badRequest('ProductVariant productId is missing');
    if (!sku) throw CustomError.badRequest('ProductVariant sku is missing');

    const label = (rel: unknown): string | undefined => {
      if (rel == null) return undefined;
      if (typeof rel === 'object' && rel !== null && 'name' in rel) {
        const n = (rel as { name: unknown }).name;
        if (typeof n === 'string') return n;
      }
      if (typeof rel === 'string') return rel;
      return undefined;
    };

    const imageUrl = (): string | undefined => {
      if (typeof image === 'string') return image;
      if (image && typeof image === 'object' && 'url' in image && typeof (image as { url: string }).url === 'string') {
        return (image as { url: string }).url;
      }
      return undefined;
    };

    return new ProductVariantEntity(
      id ?? _id,
      productId,
      sku,
      stock,
      soldCount,
      Boolean(isActive),
      Boolean(isDeleted),
      colorId,
      sizeId,
      price,
      imageUrl(),
      label(color),
      label(size),
    );
  }
}
