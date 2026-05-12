import { OrderItemEntity } from '../entities/order-item.entity';
export declare abstract class OrderItemRepository {
    abstract findById(id: string): Promise<OrderItemEntity>;
    abstract findByOrderId(orderId: string): Promise<OrderItemEntity[]>;
}
//# sourceMappingURL=order-item.repository.d.ts.map