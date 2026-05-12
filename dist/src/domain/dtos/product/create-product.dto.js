"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
const gender_type_1 = require("../../types/gender.type");
class CreateProductDto {
    name;
    description;
    price;
    gender;
    brandId;
    categoryId;
    discountId;
    tagIds;
    materialIds;
    constructor(name, description, price, gender, brandId, categoryId, discountId, tagIds, materialIds) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.gender = gender;
        this.brandId = brandId;
        this.categoryId = categoryId;
        this.discountId = discountId;
        this.tagIds = tagIds;
        this.materialIds = materialIds;
    }
    static create(object) {
        const { name, description, price, gender, brandId, categoryId, discountId, tagIds, materialIds } = object;
        if (!name)
            return ['Name property is required'];
        if (typeof name !== 'string' || name.trim().length === 0)
            return ['Name must be a non-empty string'];
        if (!description)
            return ['Description property is required'];
        if (typeof description !== 'string' || description.trim().length === 0) {
            return ['Description must be a non-empty string'];
        }
        if (price === undefined || price === null)
            return ['Price property is required'];
        if (typeof price !== 'number' || price < 0)
            return ['Price must be a non-negative number'];
        if (!gender)
            return ['Gender property is required'];
        if (!Object.values(gender_type_1.Gender).includes(gender)) {
            return [`Gender must be one of: ${Object.values(gender_type_1.Gender).join(', ')}`];
        }
        if (tagIds !== undefined && !Array.isArray(tagIds))
            return ['TagIds must be an array'];
        if (materialIds !== undefined && !Array.isArray(materialIds))
            return ['MaterialIds must be an array'];
        return [
            undefined,
            new CreateProductDto(name.trim(), description.trim(), price, gender, brandId, categoryId, discountId, tagIds, materialIds),
        ];
    }
}
exports.CreateProductDto = CreateProductDto;
//# sourceMappingURL=create-product.dto.js.map