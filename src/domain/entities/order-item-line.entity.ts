import { CustomError } from './errors/custom.error';

/** Ítem en respuestas de órdenes (snapshot almacenado en BD, sin joins a variant/product) */
export class OrderItemLineEntity {
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

  static fromSnapshotRow(row: {
    id: string;
    orderId: string;
    productId?: string | null;
    productVariantId?: string | null;
    imageUrl: string;
    colorName: string;
    sizeName: string;
    productName: string;
    quantity: number;
    price: number;
  }): OrderItemLineEntity {
    const {
      id,
      orderId,
      productId,
      productVariantId,
      imageUrl,
      colorName,
      sizeName,
      productName,
      quantity,
      price,
    } = row;

    if (!id) throw CustomError.badRequest('OrderItemLine id is missing');
    if (!orderId) throw CustomError.badRequest('OrderItemLine orderId is missing');
    if (imageUrl === undefined || imageUrl === null) {
      throw CustomError.badRequest('OrderItemLine imageUrl is missing');
    }
    if (colorName === undefined || colorName === null) {
      throw CustomError.badRequest('OrderItemLine colorName is missing');
    }
    if (sizeName === undefined || sizeName === null) {
      throw CustomError.badRequest('OrderItemLine sizeName is missing');
    }
    if (!productName) throw CustomError.badRequest('OrderItemLine productName is missing');
    if (quantity === undefined || quantity === null) {
      throw CustomError.badRequest('OrderItemLine quantity is missing');
    }
    if (price === undefined || price === null) throw CustomError.badRequest('OrderItemLine price is missing');

    return new OrderItemLineEntity(
      id,
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
