"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderWithDetailsEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
const payment_entity_1 = require("./payment.entity");
const order_item_line_entity_1 = require("./order-item-line.entity");
/** Pedido para listados / detalle: dirección embebida, totales desglosados, pago opcional */
class OrderWithDetailsEntity {
    id;
    userId;
    street;
    city;
    state;
    country;
    postalCode;
    subtotal;
    tax;
    discount;
    shipping;
    total;
    status;
    createdAt;
    payment;
    items;
    constructor(id, userId, street, city, state, country, postalCode, subtotal, tax, discount, shipping, total, status, createdAt, payment, items) {
        this.id = id;
        this.userId = userId;
        this.street = street;
        this.city = city;
        this.state = state;
        this.country = country;
        this.postalCode = postalCode;
        this.subtotal = subtotal;
        this.tax = tax;
        this.discount = discount;
        this.shipping = shipping;
        this.total = total;
        this.status = status;
        this.createdAt = createdAt;
        this.payment = payment;
        this.items = items;
    }
    static fromAggregate(order) {
        const { id, userId, street, city, state, country, postalCode, subtotal, tax, discount, shipping, total, status, createdAt, payment, items, } = order;
        if (!id)
            throw custom_error_1.CustomError.badRequest('Order id is missing');
        if (!userId)
            throw custom_error_1.CustomError.badRequest('Order userId is missing');
        if (total === undefined || total === null)
            throw custom_error_1.CustomError.badRequest('Order total is missing');
        if (!status)
            throw custom_error_1.CustomError.badRequest('Order status is missing');
        const paymentEntity = payment ? payment_entity_1.PaymentEntity.fromObject(payment) : null;
        const itemEntities = items.map(order_item_line_entity_1.OrderItemLineEntity.fromSnapshotRow);
        return new OrderWithDetailsEntity(id, userId, street, city, state, country, postalCode, subtotal, tax, discount, shipping, total, status, new Date(createdAt), paymentEntity, itemEntities);
    }
}
exports.OrderWithDetailsEntity = OrderWithDetailsEntity;
//# sourceMappingURL=order-with-details.entity.js.map