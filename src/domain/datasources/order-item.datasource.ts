import { OrderItemEntity } from '../entities/order-item.entity';

export abstract class OrderItemDatasource {
  abstract findById(id: string): Promise<OrderItemEntity>;
  abstract findByOrderId(orderId: string): Promise<OrderItemEntity[]>;
}
