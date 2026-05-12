"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class ProductEntity {
    id;
    name;
    description;
    price;
    gender;
    averageRating;
    reviewCount;
    ratingSum;
    soldCount;
    createdAt;
    updatedAt;
    isActive;
    isDeleted;
    brandId;
    categoryId;
    discountId;
    constructor(id, name, description, price, gender, averageRating, reviewCount, ratingSum, soldCount, createdAt, updatedAt, isActive, isDeleted, brandId, categoryId, discountId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.gender = gender;
        this.averageRating = averageRating;
        this.reviewCount = reviewCount;
        this.ratingSum = ratingSum;
        this.soldCount = soldCount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
        this.brandId = brandId;
        this.categoryId = categoryId;
        this.discountId = discountId;
    }
    static fromObject(object) {
        const { id, _id, name, description, price, gender, averageRating, reviewCount, ratingSum, soldCount, createdAt, updatedAt, isActive = true, isDeleted = false, brandId, categoryId, discountId, } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('Product id is missing');
        if (!name)
            throw custom_error_1.CustomError.badRequest('Product name is missing');
        if (!description)
            throw custom_error_1.CustomError.badRequest('Product description is missing');
        if (price === undefined || price === null)
            throw custom_error_1.CustomError.badRequest('Product price is missing');
        if (!gender)
            throw custom_error_1.CustomError.badRequest('Product gender is missing');
        return new ProductEntity(id ?? _id, name, description, price, gender, averageRating ?? 0, reviewCount ?? 0, ratingSum ?? 0, soldCount ?? 0, new Date(createdAt), new Date(updatedAt), Boolean(isActive), Boolean(isDeleted), brandId, categoryId, discountId);
    }
}
exports.ProductEntity = ProductEntity;
//# sourceMappingURL=product.entity.js.map