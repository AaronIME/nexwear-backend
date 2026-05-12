"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductDto = void 0;
const gender_type_1 = require("../../types/gender.type");
class UpdateProductDto {
    id;
    name;
    description;
    price;
    gender;
    brandId;
    categoryId;
    discountId;
    tagIds;
    materialIds;
    soldCount;
    constructor(id, name, description, price, gender, brandId, categoryId, discountId, tagIds, materialIds, soldCount) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.gender = gender;
        this.brandId = brandId;
        this.categoryId = categoryId;
        this.discountId = discountId;
        this.tagIds = tagIds;
        this.materialIds = materialIds;
        this.soldCount = soldCount;
    }
    static create(object) {
        const { id, name, description, price, gender, brandId, categoryId, discountId, tagIds, materialIds, soldCount } = object;
        if (!id)
            return ['Id property is required'];
        if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
            return ['Name must be a non-empty string'];
        }
        if (description !== undefined && (typeof description !== 'string' || description.trim().length === 0)) {
            return ['Description must be a non-empty string'];
        }
        if (price !== undefined && (typeof price !== 'number' || price < 0)) {
            return ['Price must be a non-negative number'];
        }
        if (gender !== undefined && !Object.values(gender_type_1.Gender).includes(gender)) {
            return [`Gender must be one of: ${Object.values(gender_type_1.Gender).join(', ')}`];
        }
        if (tagIds !== undefined && !Array.isArray(tagIds))
            return ['TagIds must be an array'];
        if (materialIds !== undefined && !Array.isArray(materialIds))
            return ['MaterialIds must be an array'];
        if (soldCount !== undefined && (typeof soldCount !== 'number' || soldCount < 0)) {
            return ['SoldCount must be a non-negative number'];
        }
        return [
            undefined,
            new UpdateProductDto(id, name?.trim(), description?.trim(), price, gender, brandId, categoryId, discountId, tagIds, materialIds, soldCount),
        ];
    }
}
exports.UpdateProductDto = UpdateProductDto;
//# sourceMappingURL=update-product.dto.js.map