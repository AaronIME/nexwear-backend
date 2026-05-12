"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductListEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
const brand_entity_1 = require("./brand.entity");
const category_entity_1 = require("./category.entity");
const discount_entity_1 = require("./discount.entity");
const product_image_entity_1 = require("./product-image.entity");
class ProductListEntity {
    id;
    name;
    description;
    price;
    finalPrice;
    gender;
    averageRating;
    reviewCount;
    soldCount;
    createdAt;
    updatedAt;
    brand;
    category;
    discount;
    firstImage;
    constructor(id, name, description, price, finalPrice, gender, averageRating, reviewCount, soldCount, createdAt, updatedAt, brand, category, discount, firstImage) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.finalPrice = finalPrice;
        this.gender = gender;
        this.averageRating = averageRating;
        this.reviewCount = reviewCount;
        this.soldCount = soldCount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.brand = brand;
        this.category = category;
        this.discount = discount;
        this.firstImage = firstImage;
    }
    static fromObject(object) {
        const { id, _id, name, description, price, gender, averageRating, reviewCount, soldCount, createdAt, updatedAt, brand, category, discount, images, } = object;
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
        const finalPrice = ProductListEntity.calculateFinalPrice(price, discount);
        return new ProductListEntity(id ?? _id, name, description, price, finalPrice, gender, averageRating ?? 0, reviewCount ?? 0, soldCount ?? 0, new Date(createdAt), new Date(updatedAt), brand ? brand_entity_1.BrandEntity.fromObject(brand) : undefined, category ? category_entity_1.CategoryEntity.fromObject(category) : undefined, discount ? discount_entity_1.DiscountEntity.fromObject(discount) : undefined, images && images.length > 0 ? product_image_entity_1.ProductImageEntity.fromObject(images[0]) : undefined);
    }
    static calculateFinalPrice(price, discount) {
        if (!discount)
            return price;
        const now = new Date();
        const startDate = new Date(discount.startDate);
        const endDate = new Date(discount.endDate);
        const isValidDiscount = now >= startDate && now <= endDate;
        if (!isValidDiscount)
            return price;
        const discountAmount = price * (discount.percentage / 100);
        const finalPrice = price - discountAmount;
        return Math.round(finalPrice * 100) / 100;
    }
}
exports.ProductListEntity = ProductListEntity;
//# sourceMappingURL=product-list.entity.js.map