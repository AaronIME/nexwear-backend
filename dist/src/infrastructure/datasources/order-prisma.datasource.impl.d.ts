import { PrismaClient } from '../../../generated/prisma/client';
import { OrderDatasource, OrderListPaginationResult } from '../../domain/datasources/order.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateOrderDto } from '../../domain/dtos/order/create-order.dto';
import { UpdateOrderDto } from '../../domain/dtos/order/update-order.dto';
import { OrderEntity } from '../../domain/entities/order.entity';
import { OrderItemEntity } from '../../domain/entities/order-item.entity';
import { OrderWithDetailsEntity } from '../../domain/entities/order-with-details.entity';
export declare class OrderPrismaDatasourceImpl implements OrderDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    private mapOrderRowToDetails;
    create(dto: CreateOrderDto): Promise<OrderEntity>;
    findAll(dto: PaginationDto): Promise<OrderListPaginationResult>;
    findById(id: string): Promise<OrderWithDetailsEntity>;
    findByUserId(userId: string, dto: PaginationDto): Promise<OrderListPaginationResult>;
    getItems(orderId: string): Promise<OrderItemEntity[]>;
    updateStatus(dto: UpdateOrderDto): Promise<OrderEntity>;
    delete(id: string): Promise<OrderEntity>;
    private restoreStock;
}
//# sourceMappingURL=order-prisma.datasource.impl.d.ts.map