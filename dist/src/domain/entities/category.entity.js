"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class CategoryEntity {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static fromObject(object) {
        const { id, _id, name } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('Category id is missing');
        if (!name)
            throw custom_error_1.CustomError.badRequest('Category name is missing');
        return new CategoryEntity(id ?? _id, name);
    }
}
exports.CategoryEntity = CategoryEntity;
//# sourceMappingURL=category.entity.js.map