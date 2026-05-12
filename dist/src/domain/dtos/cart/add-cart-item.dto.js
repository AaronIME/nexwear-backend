"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCartItemDto = void 0;
class AddCartItemDto {
    cartId;
    productVariantId;
    quantity;
    constructor(cartId, productVariantId, quantity) {
        this.cartId = cartId;
        this.productVariantId = productVariantId;
        this.quantity = quantity;
    }
    static create(object) {
        const { cartId, productVariantId, quantity = 1 } = object;
        if (!cartId)
            return ['CartId property is required'];
        if (!productVariantId)
            return ['ProductVariantId property is required'];
        if (typeof quantity !== 'number' || quantity < 1)
            return ['Quantity must be a positive integer'];
        return [undefined, new AddCartItemDto(cartId, productVariantId, Math.floor(quantity))];
    }
}
exports.AddCartItemDto = AddCartItemDto;
//# sourceMappingURL=add-cart-item.dto.js.map