import { OrderStatus } from '../../types/order-status.type';

const validStatuses = Object.values(OrderStatus);

export class UpdateOrderDto {
  constructor(
    public readonly id: string,
    public readonly status: OrderStatus,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, UpdateOrderDto?] {
    const { id, status } = object;

    if (!id) return ['Id property is required'];
    if (!status) return ['Status property is required'];
    if (!validStatuses.includes(status)) {
      return [`Status must be one of: ${validStatuses.join(', ')}`];
    }

    return [undefined, new UpdateOrderDto(id, status as OrderStatus)];
  }
}
