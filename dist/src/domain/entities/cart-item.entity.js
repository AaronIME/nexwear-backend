"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
const product_variant_entity_1 = require("./product-variant.entity");
class CartItemEntity {
    id;
    cartId;
    productVariantId;
    quantity;
    productVariant;
    productName;
    constructor(id, cartId, productVariantId, quantity, productVariant, productName) {
        this.id = id;
        this.cartId = cartId;
        this.productVariantId = productVariantId;
        this.quantity = quantity;
        this.productVariant = productVariant;
        this.productName = productName;
    }
    static fromObject(object) {
        const { id, _id, cartId, productVariantId, quantity = 1, productVariant, productName } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('CartItem id is missing');
        if (!cartId)
            throw custom_error_1.CustomError.badRequest('CartItem cartId is missing');
        if (!productVariantId)
            throw custom_error_1.CustomError.badRequest('CartItem productVariantId is missing');
        return new CartItemEntity(id ?? _id, cartId, productVariantId, quantity, productVariant ? product_variant_entity_1.ProductVariantEntity.fromObject(productVariant) : undefined, typeof productName === 'string' ? productName : undefined);
    }
}
exports.CartItemEntity = CartItemEntity;
//# sourceMappingURL=cart-item.entity.js.map