"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPrismaDatasourceImpl = void 0;
const client_1 = require("../../../generated/prisma/client");
const order_entity_1 = require("../../domain/entities/order.entity");
const order_item_entity_1 = require("../../domain/entities/order-item.entity");
const order_with_details_entity_1 = require("../../domain/entities/order-with-details.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
const order_status_type_1 = require("../../domain/types/order-status.type");
const ORDER_WITH_DETAILS_INCLUDE = {
    payment: true,
    items: {
        orderBy: { id: client_1.Prisma.SortOrder.asc },
    },
};
const CANCELLABLE_STATUSES = [order_status_type_1.OrderStatus.PENDING, order_status_type_1.OrderStatus.CONFIRMED];
class OrderPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapOrderRowToDetails(row) {
        return order_with_details_entity_1.OrderWithDetailsEntity.fromAggregate({
            ...row,
            status: row.status,
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
    async create(dto) {
        const userExists = await this.prisma.user.findUnique({
            where: { id: dto.userId },
        });
        if (!userExists)
            throw custom_error_1.CustomError.notFound(`User with id "${dto.userId}" not found`);
        const addressExists = await this.prisma.userAddress.findUnique({
            where: { id: dto.addressId },
        });
        if (!addressExists)
            throw custom_error_1.CustomError.notFound(`Address with id "${dto.addressId}" not found`);
        const variantIds = dto.items.map((item) => item.productVariantId);
        const variants = await this.prisma.productVariant.findMany({
            where: { id: { in: variantIds }, isDeleted: false },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        images: {
                            orderBy: { order: client_1.Prisma.SortOrder.asc },
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
            throw custom_error_1.CustomError.notFound('One or more product variants were not found');
        }
        for (const item of dto.items) {
            const variant = variants.find((v) => v.id === item.productVariantId);
            if (variant.stock < item.quantity) {
                throw custom_error_1.CustomError.badRequest(`Not enough stock for variant "${variant.id}". Available: ${variant.stock}, requested: ${item.quantity}`);
            }
        }
        const lineSnapshots = dto.items.map((item) => {
            const variant = variants.find((v) => v.id === item.productVariantId);
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
                const variant = variants.find((v) => v.id === item.productVariantId);
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
                    status: order_status_type_1.OrderStatus.PENDING,
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
        return order_entity_1.OrderEntity.fromObject(order);
    }
    async findAll(dto) {
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
    async findById(id) {
        const row = await this.prisma.order.findUnique({
            where: { id },
            include: ORDER_WITH_DETAILS_INCLUDE,
        });
        if (!row)
            throw custom_error_1.CustomError.notFound(`Order with id "${id}" not found`);
        return this.mapOrderRowToDetails(row);
    }
    async findByUserId(userId, dto) {
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
            next: page < pages
                ? `api/orders/user/${userPath}?page=${page + 1}&limit=${limit}`
                : undefined,
            prev: page > 1 ? `api/orders/user/${userPath}?page=${page - 1}&limit=${limit}` : undefined,
            orders: rows.map((row) => this.mapOrderRowToDetails(row)),
        };
    }
    async getItems(orderId) {
        const exists = await this.prisma.order.findUnique({
            where: { id: orderId },
            select: { id: true },
        });
        if (!exists)
            throw custom_error_1.CustomError.notFound(`Order with id "${orderId}" not found`);
        const items = await this.prisma.orderItem.findMany({
            where: { orderId },
            orderBy: { id: 'asc' },
        });
        return items.map(order_item_entity_1.OrderItemEntity.fromObject);
    }
    async updateStatus(dto) {
        const existing = await this.prisma.order.findUnique({ where: { id: dto.id } });
        if (!existing)
            throw custom_error_1.CustomError.notFound(`Order with id "${dto.id}" not found`);
        const currentStatus = existing.status;
        if (dto.status === order_status_type_1.OrderStatus.CANCELLED && !CANCELLABLE_STATUSES.includes(currentStatus)) {
            throw custom_error_1.CustomError.badRequest(`Order cannot be cancelled in status "${currentStatus}"`);
        }
        if (dto.status === order_status_type_1.OrderStatus.CANCELLED) {
            await this.restoreStock(dto.id);
        }
        const updated = await this.prisma.order.update({
            where: { id: dto.id },
            data: { status: dto.status },
        });
        return order_entity_1.OrderEntity.fromObject(updated);
    }
    async delete(id) {
        const existing = await this.prisma.order.findUnique({ where: { id } });
        if (!existing)
            throw custom_error_1.CustomError.notFound(`Order with id "${id}" not found`);
        if (existing.status !== order_status_type_1.OrderStatus.CANCELLED) {
            throw custom_error_1.CustomError.badRequest('Only cancelled orders can be deleted');
        }
        const deleted = await this.prisma.order.delete({ where: { id } });
        return order_entity_1.OrderEntity.fromObject(deleted);
    }
    async restoreStock(orderId) {
        const items = await this.prisma.orderItem.findMany({ where: { orderId } });
        const updates = items
            .filter((item) => item.productVariantId)
            .map((item) => this.prisma.productVariant.update({
            where: { id: item.productVariantId },
            data: { stock: { increment: item.quantity } },
        }));
        if (updates.length === 0)
            return;
        await this.prisma.$transaction(updates);
    }
}
exports.OrderPrismaDatasourceImpl = OrderPrismaDatasourceImpl;
//# sourceMappingURL=order-prisma.datasource.impl.js.map