import { CustomError } from './errors/custom.error';
import { ProductVariantEntity } from './product-variant.entity';

export class CartItemEntity {
  constructor(
    public readonly id: string,
    public readonly cartId: string,
    public readonly productVariantId: string,
    public readonly quantity: number,
    public readonly productVariant?: ProductVariantEntity,
    public readonly productName?: string,
  ) {}

  static fromObject(object: { [key: string]: any }): CartItemEntity {
    const { id, _id, cartId, productVariantId, quantity = 1, productVariant, productName } = object;

    if (!id && !_id) throw CustomError.badRequest('CartItem id is missing');
    if (!cartId) throw CustomError.badRequest('CartItem cartId is missing');
    if (!productVariantId) throw CustomError.badRequest('CartItem productVariantId is missing');

    return new CartItemEntity(
      id ?? _id,
      cartId,
      productVariantId,
      quantity,
      productVariant ? ProductVariantEntity.fromObject(productVariant) : undefined,
      typeof productName === 'string' ? productName : undefined,
    );
  }
}
