"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMaterialDto = void 0;
class CreateMaterialDto {
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
        return [undefined, new CreateMaterialDto(name.trim())];
    }
}
exports.CreateMaterialDto = CreateMaterialDto;
//# sourceMappingURL=create-material.dto.js.map