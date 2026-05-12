"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemLineEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
/** Ítem en respuestas de órdenes (snapshot almacenado en BD, sin joins a variant/product) */
class OrderItemLineEntity {
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
    static fromSnapshotRow(row) {
        const { id, orderId, productId, productVariantId, imageUrl, colorName, sizeName, productName, quantity, price, } = row;
        if (!id)
            throw custom_error_1.CustomError.badRequest('OrderItemLine id is missing');
        if (!orderId)
            throw custom_error_1.CustomError.badRequest('OrderItemLine orderId is missing');
        if (imageUrl === undefined || imageUrl === null) {
            throw custom_error_1.CustomError.badRequest('OrderItemLine imageUrl is missing');
        }
        if (colorName === undefined || colorName === null) {
            throw custom_error_1.CustomError.badRequest('OrderItemLine colorName is missing');
        }
        if (sizeName === undefined || sizeName === null) {
            throw custom_error_1.CustomError.badRequest('OrderItemLine sizeName is missing');
        }
        if (!productName)
            throw custom_error_1.CustomError.badRequest('OrderItemLine productName is missing');
        if (quantity === undefined || quantity === null) {
            throw custom_error_1.CustomError.badRequest('OrderItemLine quantity is missing');
        }
        if (price === undefined || price === null)
            throw custom_error_1.CustomError.badRequest('OrderItemLine price is missing');
        return new OrderItemLineEntity(id, orderId, productId ?? null, productVariantId ?? null, imageUrl, colorName, sizeName, productName, quantity, price);
    }
}
exports.OrderItemLineEntity = OrderItemLineEntity;
//# sourceMappingURL=order-item-line.entity.js.map