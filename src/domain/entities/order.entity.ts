import { CustomError } from './errors/custom.error';
import { OrderStatus } from '../types/order-status.type';

export class OrderEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly street: string,
    public readonly city: string,
    public readonly state: string,
    public readonly country: string,
    public readonly postalCode: string,
    public readonly subtotal: number,
    public readonly tax: number,
    public readonly discount: number,
    public readonly shipping: number,
    public readonly total: number,
    public readonly status: OrderStatus,
    public readonly createdAt: Date,
  ) {}

  static fromObject(object: { [key: string]: any }): OrderEntity {
    const {
      id,
      _id,
      userId,
      street,
      city,
      state,
      country,
      postalCode,
      subtotal,
      tax,
      discount,
      shipping,
      total,
      status,
      createdAt,
    } = object;

    if (!id && !_id) throw CustomError.badRequest('Order id is missing');
    if (!userId) throw CustomError.badRequest('Order userId is missing');
    if (!street) throw CustomError.badRequest('Order street is missing');
    if (!city) throw CustomError.badRequest('Order city is missing');
    if (!state) throw CustomError.badRequest('Order state is missing');
    if (!country) throw CustomError.badRequest('Order country is missing');
    if (!postalCode) throw CustomError.badRequest('Order postalCode is missing');
    if (subtotal === undefined || subtotal === null) throw CustomError.badRequest('Order subtotal is missing');
    if (tax === undefined || tax === null) throw CustomError.badRequest('Order tax is missing');
    if (discount === undefined || discount === null) throw CustomError.badRequest('Order discount is missing');
    if (shipping === undefined || shipping === null) throw CustomError.badRequest('Order shipping is missing');
    if (total === undefined || total === null) throw CustomError.badRequest('Order total is missing');
    if (!status) throw CustomError.badRequest('Order status is missing');

    return new OrderEntity(
      id ?? _id,
      userId,
      street,
      city,
      state,
      country,
      postalCode,
      subtotal,
      tax,
      discount,
      shipping,
      total,
      status as OrderStatus,
      new Date(createdAt),
    );
  }
}
