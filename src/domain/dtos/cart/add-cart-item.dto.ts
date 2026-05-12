export class AddCartItemDto {
  constructor(
    public readonly cartId: string,
    public readonly productVariantId: string,
    public readonly quantity: number,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, AddCartItemDto?] {
    const { cartId, productVariantId, quantity = 1 } = object;

    if (!cartId) return ['CartId property is required'];
    if (!productVariantId) return ['ProductVariantId property is required'];
    if (typeof quantity !== 'number' || quantity < 1) return ['Quantity must be a positive integer'];

    return [undefined, new AddCartItemDto(cartId, productVariantId, Math.floor(quantity))];
  }
}
