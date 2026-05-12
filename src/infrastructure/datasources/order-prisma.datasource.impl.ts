import { PrismaClient, Prisma } from '../../../generated/prisma/client';
import { OrderDatasource, OrderListPaginationResult } from '../../domain/datasources/order.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateOrderDto } from '../../domain/dtos/order/create-order.dto';
import { UpdateOrderDto } from '../../domain/dtos/order/update-order.dto';
import { OrderEntity } from '../../domain/entities/order.entity';
import { OrderItemEntity } from '../../domain/entities/order-item.entity';
import { OrderWithDetailsEntity } from '../../domain/entities/order-with-details.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';
import { OrderStatus } from '../../domain/types/order-status.type';

const ORDER_WITH_DETAILS_INCLUDE = {
  payment: true,
  items: {
    orderBy: { id: Prisma.SortOrder.asc },
  },
} satisfies Prisma.OrderInclude;

type OrderWithDetailsRow = Prisma.OrderGetPayload<{ include: typeof ORDER_WITH_DETAILS_INCLUDE }>;

const CANCELLABLE_STATUSES: OrderStatus[] = [OrderStatus.PENDING, OrderStatus.CONFIRMED];

export class OrderPrismaDatasourceImpl implements OrderDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  private mapOrderRowToDetails(row: OrderWithDetailsRow): OrderWithDetailsEntity {
    return OrderWithDetailsEntity.fromAggregate({
      ...row,
      status: row.status as OrderStatus,
      payment: row.payment,
      items: row.items.map((oi) => ({
        id: oi.id,
        orderId: oi.orderId,
        productId: oi.productId,
        productVariantId: oi.productVariantId,
        imageUrl: oi.imageUrl,
        colorName: oi.colorName,
        sizeName: oi.sizeName,
        productName: oi.productName,
        quantity: oi.quantity,
        price: oi.price,
      })),
    });
  }

  async create(dto: CreateOrderDto): Promise<OrderEntity> {
    const userExists = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    if (!userExists) throw CustomError.notFound(`User with id "${dto.userId}" not found`);

    const addressExists = await this.prisma.userAddress.findUnique({
      where: { id: dto.addressId },
    });
    if (!addressExists) throw CustomError.notFound(`Address with id "${dto.addressId}" not found`);

    const variantIds = dto.items.map((item) => item.productVariantId);
    const variants = await this.prisma.productVariant.findMany({
      where: { id: { in: variantIds }, isDeleted: false },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            images: {
              orderBy: { order: Prisma.SortOrder.asc },
              take: 1,
              select: { url: true },
            },
          },
        },
        color: { select: { name: true } },
        size: { select: { name: true } },
      },
    });

    if (variants.length !== variantIds.length) {
      throw CustomError.notFound('One or more product variants were not found');
    }

    for (const item of dto.items) {
      const variant = variants.find((v) => v.id === item.productVariantId)!;
      if (variant.stock < item.quantity) {
        throw CustomError.badRequest(
          `Not enough stock for variant "${variant.id}". Available: ${variant.stock}, requested: ${item.quantity}`,
        );
      }
    }

    const lineSnapshots = dto.items.map((item) => {
      const variant = variants.find((v) => v.id === item.productVariantId)!;
      const price = variant.price ?? 0;
      const imageUrl = variant.product.images[0]?.url ?? '';
      return {
        productId: variant.productId,
        productVariantId: variant.id,
        quantity: item.quantity,
        price,
        imageUrl,
        colorName: variant.color?.name ?? '',
        sizeName: variant.size?.name ?? '',
        productName: variant.product.name,
      };
    });

    const subtotal = lineSnapshots.reduce((sum, line) => sum + line.price * line.quantity, 0);
    const total = subtotal + dto.tax + dto.shipping - dto.discount;

    const order = await this.prisma.$transaction(async (tx) => {
      for (const item of dto.items) {
        const variant = variants.find((v) => v.id === item.productVariantId)!;
        await tx.productVariant.update({
          where: { id: variant.id },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return tx.order.create({
        data: {
          userId: dto.userId,
          street: addressExists.street,
          city: addressExists.city,
          state: addressExists.state,
          country: addressExists.country,
          postalCode: addressExists.postalCode,
          subtotal,
          tax: dto.tax,
          discount: dto.discount,
          shipping: dto.shipping,
          total,
          status: OrderStatus.PENDING,
          items: {
            create: lineSnapshots.map((line) => ({
              productId: line.productId,
              productVariantId: line.productVariantId,
              imageUrl: line.imageUrl,
              colorName: line.colorName,
              sizeName: line.sizeName,
              productName: line.productName,
              quantity: line.quantity,
              price: line.price,
            })),
          },
        },
      });
    });

    return OrderEntity.fromObject(order);
  }

  async findAll(dto: PaginationDto): Promise<OrderListPaginationResult> {
    const { page, limit } = dto;
    const skip = (page - 1) * limit;

    const [total, rows] = await this.prisma.$transaction([
      this.prisma.order.count(),
      this.prisma.order.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: ORDER_WITH_DETAILS_INCLUDE,
      }),
    ]);

    const pages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      pages,
      next: page < pages ? `api/orders?page=${page + 1}&limit=${limit}` : undefined,
      prev: page > 1 ? `api/orders?page=${page - 1}&limit=${limit}` : undefined,
      orders: rows.map((row) => this.mapOrderRowToDetails(row)),
    };
  }

  async findById(id: string): Promise<OrderWithDetailsEntity> {
    const row = await this.prisma.order.findUnique({
      where: { id },
      include: ORDER_WITH_DETAILS_INCLUDE,
    });
    if (!row) throw CustomError.notFound(`Order with id "${id}" not found`);

    return this.mapOrderRowToDetails(row);
  }

  async findByUserId(userId: string, dto: PaginationDto): Promise<OrderListPaginationResult> {
    const { page, limit } = dto;
    const skip = (page - 1) * limit;

    const [total, rows] = await this.prisma.$transaction([
      this.prisma.order.count({ where: { userId } }),
      this.prisma.order.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: ORDER_WITH_DETAILS_INCLUDE,
      }),
    ]);

    const pages = Math.ceil(total / limit);
    const userPath = encodeURIComponent(userId);

    return {
      page,
      limit,
      total,
      pages,
      next:
        page < pages
          ? `api/orders/user/${userPath}?page=${page + 1}&limit=${limit}`
          : undefined,
      prev:
        page > 1 ? `api/orders/user/${userPath}?page=${page - 1}&limit=${limit}` : undefined,
      orders: rows.map((row) => this.mapOrderRowToDetails(row)),
    };
  }

  async getItems(orderId: string): Promise<OrderItemEntity[]> {
    const exists = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true },
    });
    if (!exists) throw CustomError.notFound(`Order with id "${orderId}" not found`);

    const items = await this.prisma.orderItem.findMany({
      where: { orderId },
      orderBy: { id: 'asc' },
    });

    return items.map(OrderItemEntity.fromObject);
  }

  async updateStatus(dto: UpdateOrderDto): Promise<OrderEntity> {
    const existing = await this.prisma.order.findUnique({ where: { id: dto.id } });
    if (!existing) throw CustomError.notFound(`Order with id "${dto.id}" not found`);

    const currentStatus = existing.status as OrderStatus;

    if (dto.status === OrderStatus.CANCELLED && !CANCELLABLE_STATUSES.includes(currentStatus)) {
      throw CustomError.badRequest(
        `Order cannot be cancelled in status "${currentStatus}"`,
      );
    }

    if (dto.status === OrderStatus.CANCELLED) {
      await this.restoreStock(dto.id);
    }

    const updated = await this.prisma.order.update({
      where: { id: dto.id },
      data: { status: dto.status },
    });

    return OrderEntity.fromObject(updated);
  }

  async delete(id: string): Promise<OrderEntity> {
    const existing = await this.prisma.order.findUnique({ where: { id } });
    if (!existing) throw CustomError.notFound(`Order with id "${id}" not found`);

    if (existing.status !== OrderStatus.CANCELLED) {
      throw CustomError.badRequest('Only cancelled orders can be deleted');
    }

    const deleted = await this.prisma.order.delete({ where: { id } });

    return OrderEntity.fromObject(deleted);
  }

  private async restoreStock(orderId: string): Promise<void> {
    const items = await this.prisma.orderItem.findMany({ where: { orderId } });

    const updates = items
      .filter((item) => item.productVariantId)
      .map((item) =>
        this.prisma.productVariant.update({
          where: { id: item.productVariantId! },
          data: { stock: { increment: item.quantity } },
        }),
      );

    if (updates.length === 0) return;
    await this.prisma.$transaction(updates);
  }
}
