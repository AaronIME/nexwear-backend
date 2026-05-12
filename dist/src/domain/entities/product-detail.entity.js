"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDetailEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
const brand_entity_1 = require("./brand.entity");
const category_entity_1 = require("./category.entity");
const discount_entity_1 = require("./discount.entity");
const material_entity_1 = require("./material.entity");
const product_image_entity_1 = require("./product-image.entity");
const product_variant_entity_1 = require("./product-variant.entity");
const tag_entity_1 = require("./tag.entity");
const color_entity_1 = require("./color.entity");
const size_entity_1 = require("./size.entity");
class ProductDetailEntity {
    id;
    name;
    description;
    price;
    gender;
    averageRating;
    reviewCount;
    ratingSum;
    soldCount;
    isActive;
    isDeleted;
    createdAt;
    updatedAt;
    brand;
    tags;
    colors;
    sizes;
    category;
    discount;
    images;
    variants;
    materials;
    constructor(id, name, description, price, gender, averageRating, reviewCount, ratingSum, soldCount, isActive, isDeleted, createdAt, updatedAt, brand, tags, colors, sizes, category, discount, images, variants, materials) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.gender = gender;
        this.averageRating = averageRating;
        this.reviewCount = reviewCount;
        this.ratingSum = ratingSum;
        this.soldCount = soldCount;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.brand = brand;
        this.tags = tags;
        this.colors = colors;
        this.sizes = sizes;
        this.category = category;
        this.discount = discount;
        this.images = images;
        this.variants = variants;
        this.materials = materials;
    }
    static fromObject(object) {
        const { id, _id, name, description, price, gender, averageRating, reviewCount, ratingSum, soldCount, isActive = true, isDeleted = false, createdAt, updatedAt, brand, category, discount, images, variants, materials, tags, colors, sizes, } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest("Product id is missing");
        if (!name)
            throw custom_error_1.CustomError.badRequest("Product name is missing");
        if (!description)
            throw custom_error_1.CustomError.badRequest("Product description is missing");
        if (price === undefined || price === null)
            throw custom_error_1.CustomError.badRequest("Product price is missing");
        if (!gender)
            throw custom_error_1.CustomError.badRequest("Product gender is missing");
        return new ProductDetailEntity(id ?? _id, name, description, price, gender, averageRating ?? 0, reviewCount ?? 0, ratingSum ?? 0, soldCount ?? 0, Boolean(isActive), Boolean(isDeleted), new Date(createdAt), new Date(updatedAt), brand ? brand_entity_1.BrandEntity.fromObject(brand) : undefined, tags?.map((tag) => tag_entity_1.TagEntity.fromObject(tag.tag)) ?? [], (variants ?? [])
            .filter((variant) => variant.color)
            .map((variant) => color_entity_1.ColorEntity.fromObject(variant.color)), (variants ?? [])
            .filter((variant) => variant.size)
            .map((variant) => size_entity_1.SizeEntity.fromObject(variant.size)), category ? category_entity_1.CategoryEntity.fromObject(category) : undefined, discount ? discount_entity_1.DiscountEntity.fromObject(discount) : undefined, images ? images.map(product_image_entity_1.ProductImageEntity.fromObject) : undefined, variants ? variants.map(product_variant_entity_1.ProductVariantEntity.fromObject) : undefined, materials
            ? materials.map((material) => material_entity_1.MaterialEntity.fromObject(material.material))
            : undefined);
    }
}
exports.ProductDetailEntity = ProductDetailEntity;
//# sourceMappingURL=product-detail.entity.js.map