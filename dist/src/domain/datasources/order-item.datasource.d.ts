import { OrderItemEntity } from '../entities/order-item.entity';
export declare abstract class OrderItemDatasource {
    abstract findById(id: string): Promise<OrderItemEntity>;
    abstract findByOrderId(orderId: string): Promise<OrderItemEntity[]>;
}
//# sourceMappingURL=order-item.datasource.d.ts.map