"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepositoryImpl = void 0;
class OrderRepositoryImpl {
    datasource;
    constructor(datasource) {
        this.datasource = datasource;
    }
    create(dto) {
        return this.datasource.create(dto);
    }
    findAll(dto) {
        return this.datasource.findAll(dto);
    }
    findById(id) {
        return this.datasource.findById(id);
    }
    findByUserId(userId, dto) {
        return this.datasource.findByUserId(userId, dto);
    }
    getItems(orderId) {
        return this.datasource.getItems(orderId);
    }
    updateStatus(dto) {
        return this.datasource.updateStatus(dto);
    }
    delete(id) {
        return this.datasource.delete(id);
    }
}
exports.OrderRepositoryImpl = OrderRepositoryImpl;
//# sourceMappingURL=order.repository.impl.js.map