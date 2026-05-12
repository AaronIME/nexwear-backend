"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRepositoryImpl = void 0;
class ReviewRepositoryImpl {
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
    findByProductId(productId, dto) {
        return this.datasource.findByProductId(productId, dto);
    }
    findByUserId(userId, dto) {
        return this.datasource.findByUserId(userId, dto);
    }
    update(dto) {
        return this.datasource.update(dto);
    }
    delete(id) {
        return this.datasource.delete(id);
    }
}
exports.ReviewRepositoryImpl = ReviewRepositoryImpl;
//# sourceMappingURL=review.repository.impl.js.map