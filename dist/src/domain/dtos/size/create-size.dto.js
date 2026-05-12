"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSizeDto = void 0;
class CreateSizeDto {
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
        return [undefined, new CreateSizeDto(name.trim())];
    }
}
exports.CreateSizeDto = CreateSizeDto;
//# sourceMappingURL=create-size.dto.js.map