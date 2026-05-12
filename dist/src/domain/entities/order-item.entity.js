"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
/** Línea de pedido persistida como snapshot en checkout */
class OrderItemEntity {
    id;
    orderId;
    productId;
    productVariantId;
    imageUrl;
    colorName;
    sizeName;
    productName;
    quantity;
    price;
    constructor(id, orderId, productId, productVariantId, imageUrl, colorName, sizeName, productName, quantity, price) {
        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.productVariantId = productVariantId;
        this.imageUrl = imageUrl;
        this.colorName = colorName;
        this.sizeName = sizeName;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
    }
    static fromObject(object) {
        const { id, _id, orderId, productId, productVariantId, imageUrl, colorName, sizeName, productName, quantity, price, } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('OrderItem id is missing');
        if (!orderId)
            throw custom_error_1.CustomError.badRequest('OrderItem orderId is missing');
        if (imageUrl === undefined || imageUrl === null)
            throw custom_error_1.CustomError.badRequest('OrderItem imageUrl is missing');
        if (colorName === undefined || colorName === null)
            throw custom_error_1.CustomError.badRequest('OrderItem colorName is missing');
        if (sizeName === undefined || sizeName === null)
            throw custom_error_1.CustomError.badRequest('OrderItem sizeName is missing');
        if (!productName)
            throw custom_error_1.CustomError.badRequest('OrderItem productName is missing');
        if (quantity === undefined || quantity === null)
            throw custom_error_1.CustomError.badRequest('OrderItem quantity is missing');
        if (price === undefined || price === null)
            throw custom_error_1.CustomError.badRequest('OrderItem price is missing');
        return new OrderItemEntity(id ?? _id, orderId, productId ?? null, productVariantId ?? null, imageUrl, colorName, sizeName, productName, quantity, price);
    }
}
exports.OrderItemEntity = OrderItemEntity;
//# sourceMappingURL=order-item.entity.js.map