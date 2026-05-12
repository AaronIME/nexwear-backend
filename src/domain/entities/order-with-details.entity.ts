import { OrderStatus } from '../types/order-status.type';
import { CustomError } from './errors/custom.error';
import { PaymentEntity } from './payment.entity';
import { OrderItemLineEntity } from './order-item-line.entity';

/** Pedido para listados / detalle: dirección embebida, totales desglosados, pago opcional */
export class OrderWithDetailsEntity {
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
    public readonly payment: PaymentEntity | null,
    public readonly items: OrderItemLineEntity[],
  ) {}

  static fromAggregate(order: {
    id: string;
    userId: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    subtotal: number;
    tax: number;
    discount: number;
    shipping: number;
    total: number;
    status: OrderStatus | string;
    createdAt: Date;
    payment: { [key: string]: unknown } | null;
    items: Array<Parameters<typeof OrderItemLineEntity.fromSnapshotRow>[0]>;
  }): OrderWithDetailsEntity {
    const {
      id,
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
      payment,
      items,
    } = order;

    if (!id) throw CustomError.badRequest('Order id is missing');
    if (!userId) throw CustomError.badRequest('Order userId is missing');
    if (total === undefined || total === null) throw CustomError.badRequest('Order total is missing');
    if (!status) throw CustomError.badRequest('Order status is missing');

    const paymentEntity = payment ? PaymentEntity.fromObject(payment) : null;
    const itemEntities = items.map(OrderItemLineEntity.fromSnapshotRow);

    return new OrderWithDetailsEntity(
      id,
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
      paymentEntity,
      itemEntities,
    );
  }
}
