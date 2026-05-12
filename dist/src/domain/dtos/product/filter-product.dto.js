"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterProductDto = void 0;
const gender_type_1 = require("../../types/gender.type");
class FilterProductDto {
    search;
    categoryId;
    brandId;
    colorId;
    sizeId;
    materialId;
    tagId;
    discountId;
    gender;
    minPrice;
    maxPrice;
    inStock;
    sortBy;
    constructor(search, categoryId, brandId, colorId, sizeId, materialId, tagId, discountId, gender, minPrice, maxPrice, inStock, sortBy) {
        this.search = search;
        this.categoryId = categoryId;
        this.brandId = brandId;
        this.colorId = colorId;
        this.sizeId = sizeId;
        this.materialId = materialId;
        this.tagId = tagId;
        this.discountId = discountId;
        this.gender = gender;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.inStock = inStock;
        this.sortBy = sortBy;
    }
    static create(object) {
        const { search, categoryId, brandId, colorId, sizeId, materialId, tagId, discountId, gender, minPrice, maxPrice, inStock, sortBy, } = object;
        if (minPrice !== undefined && (isNaN(Number(minPrice)) || Number(minPrice) < 0)) {
            return ['MinPrice must be a non-negative number'];
        }
        if (maxPrice !== undefined && (isNaN(Number(maxPrice)) || Number(maxPrice) < 0)) {
            return ['MaxPrice must be a non-negative number'];
        }
        if (minPrice !== undefined && maxPrice !== undefined && Number(minPrice) > Number(maxPrice)) {
            return ['MinPrice cannot be greater than MaxPrice'];
        }
        if (gender !== undefined && !Object.values(gender_type_1.Gender).includes(gender)) {
            return [`Gender must be one of: ${Object.values(gender_type_1.Gender).join(', ')}`];
        }
        const validSortOptions = ['newest', 'price-asc', 'price-desc', 'rating', 'best-selling'];
        if (sortBy !== undefined && !validSortOptions.includes(sortBy)) {
            return [`SortBy must be one of: ${validSortOptions.join(', ')}`];
        }
        return [
            undefined,
            new FilterProductDto(search, categoryId, brandId, colorId, sizeId, materialId, tagId, discountId, gender, minPrice !== undefined ? Number(minPrice) : undefined, maxPrice !== undefined ? Number(maxPrice) : undefined, inStock !== undefined ? inStock === 'true' || inStock === true : undefined, sortBy),
        ];
    }
}
exports.FilterProductDto = FilterProductDto;
//# sourceMappingURL=filter-product.dto.js.map