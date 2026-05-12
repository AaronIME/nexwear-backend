"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCartEntity = void 0;
const cart_item_entity_1 = require("./cart-item.entity");
const custom_error_1 = require("./errors/custom.error");
class UserCartEntity {
    id;
    userId;
    items;
    constructor(id, userId, items) {
        this.id = id;
        this.userId = userId;
        this.items = items;
    }
    static fromObject(object) {
        const { id, _id, userId, items } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('Cart id is missing');
        if (!userId)
            throw custom_error_1.CustomError.badRequest('Cart userId is missing');
        return new UserCartEntity(id ?? _id, userId, [...items.map((item) => cart_item_entity_1.CartItemEntity.fromObject(item))]);
    }
}
exports.UserCartEntity = UserCartEntity;
//# sourceMappingURL=user-cart.entity.js.map