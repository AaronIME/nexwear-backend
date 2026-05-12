import { OrderItemEntity } from '../entities/order-item.entity';

export abstract class OrderItemRepository {
  abstract findById(id: string): Promise<OrderItemEntity>;
  abstract findByOrderId(orderId: string): Promise<OrderItemEntity[]>;
}
