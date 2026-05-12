"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepositoryImpl = void 0;
class ProductRepositoryImpl {
    datasource;
    constructor(datasource) {
        this.datasource = datasource;
    }
    create(dto) {
        return this.datasource.create(dto);
    }
    findAll(pagination, filters) {
        return this.datasource.findAll(pagination, filters);
    }
    findById(id) {
        return this.datasource.findById(id);
    }
    update(dto) {
        return this.datasource.update(dto);
    }
    delete(id) {
        return this.datasource.delete(id);
    }
}
exports.ProductRepositoryImpl = ProductRepositoryImpl;
//# sourceMappingURL=product.repository.impl.js.map