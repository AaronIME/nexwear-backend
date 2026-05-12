"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantRepositoryImpl = void 0;
class ProductVariantRepositoryImpl {
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
exports.ProductVariantRepositoryImpl = ProductVariantRepositoryImpl;
//# sourceMappingURL=product-variant.repository.impl.js.map