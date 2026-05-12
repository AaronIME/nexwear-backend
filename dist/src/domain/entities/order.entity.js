"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class OrderEntity {
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
    constructor(id, userId, street, city, state, country, postalCode, subtotal, tax, discount, shipping, total, status, createdAt) {
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
    }
    static fromObject(object) {
        const { id, _id, userId, street, city, state, country, postalCode, subtotal, tax, discount, shipping, total, status, createdAt, } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('Order id is missing');
        if (!userId)
            throw custom_error_1.CustomError.badRequest('Order userId is missing');
        if (!street)
            throw custom_error_1.CustomError.badRequest('Order street is missing');
        if (!city)
            throw custom_error_1.CustomError.badRequest('Order city is missing');
        if (!state)
            throw custom_error_1.CustomError.badRequest('Order state is missing');
        if (!country)
            throw custom_error_1.CustomError.badRequest('Order country is missing');
        if (!postalCode)
            throw custom_error_1.CustomError.badRequest('Order postalCode is missing');
        if (subtotal === undefined || subtotal === null)
            throw custom_error_1.CustomError.badRequest('Order subtotal is missing');
        if (tax === undefined || tax === null)
            throw custom_error_1.CustomError.badRequest('Order tax is missing');
        if (discount === undefined || discount === null)
            throw custom_error_1.CustomError.badRequest('Order discount is missing');
        if (shipping === undefined || shipping === null)
            throw custom_error_1.CustomError.badRequest('Order shipping is missing');
        if (total === undefined || total === null)
            throw custom_error_1.CustomError.badRequest('Order total is missing');
        if (!status)
            throw custom_error_1.CustomError.badRequest('Order status is missing');
        return new OrderEntity(id ?? _id, userId, street, city, state, country, postalCode, subtotal, tax, discount, shipping, total, status, new Date(createdAt));
    }
}
exports.OrderEntity = OrderEntity;
//# sourceMappingURL=order.entity.js.map