export interface OrderItemInput {
  productVariantId: string;
  quantity: number;
}

export class CreateOrderDto {
  constructor(
    public readonly userId: string,
    public readonly addressId: string,
    public readonly items: OrderItemInput[],
    public readonly tax: number,
    public readonly discount: number,
    public readonly shipping: number,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, CreateOrderDto?] {
    const { userId, addressId, items, tax = 0, discount = 0, shipping = 0 } = object;

    if (!userId) return ['UserId property is required'];
    if (!addressId) return ['AddressId property is required'];

    if (!items || !Array.isArray(items) || items.length === 0) {
      return ['Items must be a non-empty array'];
    }

    for (const item of items) {
      if (!item.productVariantId) return ['Each item must have a productVariantId'];
      if (!item.quantity || typeof item.quantity !== 'number' || item.quantity < 1) {
        return ['Each item quantity must be a positive integer'];
      }
    }

    const parseNonNegative = (label: string, value: unknown): [string | undefined, number | undefined] => {
      if (value === undefined || value === null) return [undefined, 0];
      const n = Number(value);
      if (Number.isNaN(n) || n < 0) return [`${label} must be a non-negative number`, undefined];
      return [undefined, n];
    };

    const [taxErr, taxNum] = parseNonNegative('Tax', tax);
    if (taxErr) return [taxErr];
    const [discErr, discNum] = parseNonNegative('Discount', discount);
    if (discErr) return [discErr];
    const [shipErr, shipNum] = parseNonNegative('Shipping', shipping);
    if (shipErr) return [shipErr];

    const sanitizedItems: OrderItemInput[] = items.map((item) => ({
      productVariantId: item.productVariantId,
      quantity: Math.floor(item.quantity),
    }));

    return [
      undefined,
      new CreateOrderDto(userId, addressId, sanitizedItems, taxNum!, discNum!, shipNum!),
    ];
  }
}
