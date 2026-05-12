"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBrandDto = void 0;
class CreateBrandDto {
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
        return [undefined, new CreateBrandDto(name.trim())];
    }
}
exports.CreateBrandDto = CreateBrandDto;
//# sourceMappingURL=create-brand.dto.js.map