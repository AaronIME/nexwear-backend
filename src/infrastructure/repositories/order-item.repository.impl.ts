import { OrderItemDatasource } from '../../domain/datasources/order-item.datasource';
import { OrderItemEntity } from '../../domain/entities/order-item.entity';
import { OrderItemRepository } from '../../domain/repositories/order-item.repository';

export class OrderItemRepositoryImpl implements OrderItemRepository {
  constructor(private readonly datasource: OrderItemDatasource) {}

  findById(id: string): Promise<OrderItemEntity> {
    return this.datasource.findById(id);
  }

  findByOrderId(orderId: string): Promise<OrderItemEntity[]> {
    return this.datasource.findByOrderId(orderId);
  }
}
