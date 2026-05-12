import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateOrderDto } from '../dtos/order/create-order.dto';
import { UpdateOrderDto } from '../dtos/order/update-order.dto';
import { OrderEntity } from '../entities/order.entity';
import { OrderWithDetailsEntity } from '../entities/order-with-details.entity';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderListPaginationResult } from '../datasources/order.datasource';
export declare abstract class OrderRepository {
    abstract create(dto: CreateOrderDto): Promise<OrderEntity>;
    abstract findAll(dto: PaginationDto): Promise<OrderListPaginationResult>;
    abstract findById(id: string): Promise<OrderWithDetailsEntity>;
    abstract findByUserId(userId: string, dto: PaginationDto): Promise<OrderListPaginationResult>;
    abstract getItems(orderId: string): Promise<OrderItemEntity[]>;
    abstract updateStatus(dto: UpdateOrderDto): Promise<OrderEntity>;
    abstract delete(id: string): Promise<OrderEntity>;
}
//# sourceMappingURL=order.repository.d.ts.map