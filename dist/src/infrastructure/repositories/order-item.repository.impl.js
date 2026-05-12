"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemRepositoryImpl = void 0;
class OrderItemRepositoryImpl {
    datasource;
    constructor(datasource) {
        this.datasource = datasource;
    }
    findById(id) {
        return this.datasource.findById(id);
    }
    findByOrderId(orderId) {
        return this.datasource.findByOrderId(orderId);
    }
}
exports.OrderItemRepositoryImpl = OrderItemRepositoryImpl;
//# sourceMappingURL=order-item.repository.impl.js.map