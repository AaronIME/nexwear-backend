import { PrismaClient } from '../../../generated/prisma/client';
import { OrderItemDatasource } from '../../domain/datasources/order-item.datasource';
import { OrderItemEntity } from '../../domain/entities/order-item.entity';
export declare class OrderItemPrismaDatasourceImpl implements OrderItemDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    findById(id: string): Promise<OrderItemEntity>;
    findByOrderId(orderId: string): Promise<OrderItemEntity[]>;
}
//# sourceMappingURL=order-item-prisma.datasource.impl.d.ts.map