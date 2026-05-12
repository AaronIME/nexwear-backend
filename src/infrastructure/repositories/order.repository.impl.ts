import { OrderDatasource, OrderListPaginationResult } from '../../domain/datasources/order.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateOrderDto } from '../../domain/dtos/order/create-order.dto';
import { UpdateOrderDto } from '../../domain/dtos/order/update-order.dto';
import { OrderEntity } from '../../domain/entities/order.entity';
import { OrderWithDetailsEntity } from '../../domain/entities/order-with-details.entity';
import { OrderItemEntity } from '../../domain/entities/order-item.entity';
import { OrderRepository } from '../../domain/repositories/order.repository';

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly datasource: OrderDatasource) {}

  create(dto: CreateOrderDto): Promise<OrderEntity> {
    return this.datasource.create(dto);
  }

  findAll(dto: PaginationDto): Promise<OrderListPaginationResult> {
    return this.datasource.findAll(dto);
  }

  findById(id: string): Promise<OrderWithDetailsEntity> {
    return this.datasource.findById(id);
  }

  findByUserId(userId: string, dto: PaginationDto): Promise<OrderListPaginationResult> {
    return this.datasource.findByUserId(userId, dto);
  }

  getItems(orderId: string): Promise<OrderItemEntity[]> {
    return this.datasource.getItems(orderId);
  }

  updateStatus(dto: UpdateOrderDto): Promise<OrderEntity> {
    return this.datasource.updateStatus(dto);
  }

  delete(id: string): Promise<OrderEntity> {
    return this.datasource.delete(id);
  }
}
