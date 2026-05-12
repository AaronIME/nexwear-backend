import { CustomError } from './errors/custom.error';

/** Línea de pedido persistida como snapshot en checkout */
export class OrderItemEntity {
  constructor(
    public readonly id: string,
    public readonly orderId: string,
    public readonly productId: string | null,
    public readonly productVariantId: string | null,
    public readonly imageUrl: string,
    public readonly colorName: string,
    public readonly sizeName: string,
    public readonly productName: string,
    public readonly quantity: number,
    public readonly price: number,
  ) {}

  static fromObject(object: { [key: string]: any }): OrderItemEntity {
    const {
      id,
      _id,
      orderId,
      productId,
      productVariantId,
      imageUrl,
      colorName,
      sizeName,
      productName,
      quantity,
      price,
    } = object;

    if (!id && !_id) throw CustomError.badRequest('OrderItem id is missing');
    if (!orderId) throw CustomError.badRequest('OrderItem orderId is missing');
    if (imageUrl === undefined || imageUrl === null) throw CustomError.badRequest('OrderItem imageUrl is missing');
    if (colorName === undefined || colorName === null) throw CustomError.badRequest('OrderItem colorName is missing');
    if (sizeName === undefined || sizeName === null) throw CustomError.badRequest('OrderItem sizeName is missing');
    if (!productName) throw CustomError.badRequest('OrderItem productName is missing');
    if (quantity === undefined || quantity === null) throw CustomError.badRequest('OrderItem quantity is missing');
    if (price === undefined || price === null) throw CustomError.badRequest('OrderItem price is missing');

    return new OrderItemEntity(
      id ?? _id,
      orderId,
      productId ?? null,
      productVariantId ?? null,
      imageUrl,
      colorName,
      sizeName,
      productName,
      quantity,
      price,
    );
  }
}
