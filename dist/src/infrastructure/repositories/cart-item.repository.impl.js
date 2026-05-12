"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemRepositoryImpl = void 0;
class CartItemRepositoryImpl {
    datasource;
    constructor(datasource) {
        this.datasource = datasource;
    }
    addItem(dto) {
        return this.datasource.addItem(dto);
    }
    findById(id) {
        return this.datasource.findById(id);
    }
    findByCartId(cartId) {
        return this.datasource.findByCartId(cartId);
    }
    updateQuantity(dto) {
        return this.datasource.updateQuantity(dto);
    }
    removeItem(id) {
        return this.datasource.removeItem(id);
    }
}
exports.CartItemRepositoryImpl = CartItemRepositoryImpl;
//# sourceMappingURL=cart-item.repository.impl.js.map