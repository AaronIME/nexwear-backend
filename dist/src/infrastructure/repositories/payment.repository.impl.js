"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepositoryImpl = void 0;
class PaymentRepositoryImpl {
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
    findByOrderId(orderId) {
        return this.datasource.findByOrderId(orderId);
    }
    update(dto) {
        return this.datasource.update(dto);
    }
    delete(id) {
        return this.datasource.delete(id);
    }
}
exports.PaymentRepositoryImpl = PaymentRepositoryImpl;
//# sourceMappingURL=payment.repository.impl.js.map