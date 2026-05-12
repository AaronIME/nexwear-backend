"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantImageRepositoryImpl = void 0;
class ProductVariantImageRepositoryImpl {
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
    findByProductVariantId(productVariantId) {
        return this.datasource.findByProductVariantId(productVariantId);
    }
    update(dto) {
        return this.datasource.update(dto);
    }
    delete(id) {
        return this.datasource.delete(id);
    }
}
exports.ProductVariantImageRepositoryImpl = ProductVariantImageRepositoryImpl;
//# sourceMappingURL=product-variant-image.repository.impl.js.map