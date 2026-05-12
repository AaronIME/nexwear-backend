"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class CartEntity {
    id;
    userId;
    constructor(id, userId) {
        this.id = id;
        this.userId = userId;
    }
    static fromObject(object) {
        const { id, _id, userId } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('Cart id is missing');
        if (!userId)
            throw custom_error_1.CustomError.badRequest('Cart userId is missing');
        return new CartEntity(id ?? _id, userId);
    }
}
exports.CartEntity = CartEntity;
//# sourceMappingURL=cart.entity.js.map