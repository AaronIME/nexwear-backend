import { OrderItemDatasource } from '../../domain/datasources/order-item.datasource';
import { OrderItemEntity } from '../../domain/entities/order-item.entity';
import { OrderItemRepository } from '../../domain/repositories/order-item.repository';
export declare class OrderItemRepositoryImpl implements OrderItemRepository {
    private readonly datasource;
    constructor(datasource: OrderItemDatasource);
    findById(id: string): Promise<OrderItemEntity>;
    findByOrderId(orderId: string): Promise<OrderItemEntity[]>;
}
//# sourceMappingURL=order-item.repository.impl.d.ts.map