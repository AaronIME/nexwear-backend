"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImageRepositoryImpl = void 0;
class ProductImageRepositoryImpl {
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
    findByProductId(productId) {
        return this.datasource.findByProductId(productId);
    }
    update(dto) {
        return this.datasource.update(dto);
    }
    delete(id) {
        return this.datasource.delete(id);
    }
}
exports.ProductImageRepositoryImpl = ProductImageRepositoryImpl;
//# sourceMappingURL=product-image.repository.impl.js.map