"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemPrismaDatasourceImpl = void 0;
const order_item_entity_1 = require("../../domain/entities/order-item.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
class OrderItemPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const item = await this.prisma.orderItem.findUnique({ where: { id } });
        if (!item)
            throw custom_error_1.CustomError.notFound(`Order item with id "${id}" not found`);
        return order_item_entity_1.OrderItemEntity.fromObject(item);
    }
    async findByOrderId(orderId) {
        const items = await this.prisma.orderItem.findMany({
            where: { orderId },
            orderBy: { id: 'asc' },
        });
        return items.map(order_item_entity_1.OrderItemEntity.fromObject);
    }
}
exports.OrderItemPrismaDatasourceImpl = OrderItemPrismaDatasourceImpl;
//# sourceMappingURL=order-item-prisma.datasource.impl.js.map