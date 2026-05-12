"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryDto = void 0;
class CreateCategoryDto {
    name;
    constructor(name) {
        this.name = name;
    }
    static create(object) {
        const { name } = object;
        if (!name)
            return ['Name property is required'];
        if (typeof name !== 'string' || name.trim().length === 0)
            return ['Name must be a non-empty string'];
        return [undefined, new CreateCategoryDto(name.trim())];
    }
}
exports.CreateCategoryDto = CreateCategoryDto;
//# sourceMappingURL=create-category.dto.js.map