export class UpdateCartItemDto {
  constructor(
    public readonly id: string,
    public readonly quantity: number,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, UpdateCartItemDto?] {
    const { id, quantity } = object;

    if (!id) return ['Id property is required'];
    if (quantity === undefined || quantity === null) return ['Quantity property is required'];
    if (typeof quantity !== 'number' || quantity < 1) return ['Quantity must be a positive integer'];

    return [undefined, new UpdateCartItemDto(id, Math.floor(quantity))];
  }
}
