"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCartItemDto = void 0;
class UpdateCartItemDto {
    id;
    quantity;
    constructor(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }
    static create(object) {
        const { id, quantity } = object;
        if (!id)
            return ['Id property is required'];
        if (quantity === undefined || quantity === null)
            return ['Quantity property is required'];
        if (typeof quantity !== 'number' || quantity < 1)
            return ['Quantity must be a positive integer'];
        return [undefined, new UpdateCartItemDto(id, Math.floor(quantity))];
    }
}
exports.UpdateCartItemDto = UpdateCartItemDto;
//# sourceMappingURL=update-cart-item.dto.js.map