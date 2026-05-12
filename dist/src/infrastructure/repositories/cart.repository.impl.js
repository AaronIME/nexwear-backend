"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepositoryImpl = void 0;
class CartRepositoryImpl {
    datasource;
    constructor(datasource) {
        this.datasource = datasource;
    }
    create(dto) {
        return this.datasource.create(dto);
    }
    findById(id) {
        return this.datasource.findById(id);
    }
    findByUserId(userId) {
        return this.datasource.findByUserId(userId);
    }
    getItems(cartId) {
        return this.datasource.getItems(cartId);
    }
    clear(cartId) {
        return this.datasource.clear(cartId);
    }
    delete(id) {
        return this.datasource.delete(id);
    }
}
exports.CartRepositoryImpl = CartRepositoryImpl;
//# sourceMappingURL=cart.repository.impl.js.map