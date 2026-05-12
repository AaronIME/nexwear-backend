import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateOrderDto } from '../dtos/order/create-order.dto';
import { UpdateOrderDto } from '../dtos/order/update-order.dto';
import { OrderEntity } from '../entities/order.entity';
import { OrderWithDetailsEntity } from '../entities/order-with-details.entity';
import { OrderItemEntity } from '../entities/order-item.entity';

/** Listado paginado de órdenes enriquecidas (dirección, ítems con producto/imagen/color/talla, pago) */
export interface OrderListPaginationResult {
  page: number;
  limit: number;
  total: number;
  pages: number;
  next?: string | undefined;
  prev?: string | undefined;
  orders: OrderWithDetailsEntity[];
}

export abstract class OrderDatasource {
  abstract create(dto: CreateOrderDto): Promise<OrderEntity>;
  abstract findAll(dto: PaginationDto): Promise<OrderListPaginationResult>;
  abstract findById(id: string): Promise<OrderWithDetailsEntity>;
  abstract findByUserId(userId: string, dto: PaginationDto): Promise<OrderListPaginationResult>;
  abstract getItems(orderId: string): Promise<OrderItemEntity[]>;
  abstract updateStatus(dto: UpdateOrderDto): Promise<OrderEntity>;
  abstract delete(id: string): Promise<OrderEntity>;
}
