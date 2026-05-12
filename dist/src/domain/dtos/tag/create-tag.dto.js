"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTagDto = void 0;
class CreateTagDto {
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
        return [undefined, new CreateTagDto(name.trim())];
    }
}
exports.CreateTagDto = CreateTagDto;
//# sourceMappingURL=create-tag.dto.js.map