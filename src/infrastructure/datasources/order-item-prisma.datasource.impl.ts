import { PrismaClient } from '../../../generated/prisma/client';
import { OrderItemDatasource } from '../../domain/datasources/order-item.datasource';
import { OrderItemEntity } from '../../domain/entities/order-item.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';

export class OrderItemPrismaDatasourceImpl implements OrderItemDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<OrderItemEntity> {
    const item = await this.prisma.orderItem.findUnique({ where: { id } });
    if (!item) throw CustomError.notFound(`Order item with id "${id}" not found`);

    return OrderItemEntity.fromObject(item);
  }

  async findByOrderId(orderId: string): Promise<OrderItemEntity[]> {
    const items = await this.prisma.orderItem.findMany({
      where: { orderId },
      orderBy: { id: 'asc' },
    });

    return items.map(OrderItemEntity.fromObject);
  }
}
