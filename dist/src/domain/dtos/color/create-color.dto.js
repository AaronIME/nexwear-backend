"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateColorDto = void 0;
const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
class CreateColorDto {
    name;
    hex;
    constructor(name, hex) {
        this.name = name;
        this.hex = hex;
    }
    static create(object) {
        const { name, hex } = object;
        if (!name)
            return ['Name property is required'];
        if (typeof name !== 'string' || name.trim().length === 0)
            return ['Name must be a non-empty string'];
        if (!hex)
            return ['Hex property is required'];
        if (!hexColorRegex.test(hex))
            return ['Hex must be a valid color code (e.g. #FFF or #FFFFFF)'];
        return [undefined, new CreateColorDto(name.trim(), hex.toUpperCase())];
    }
}
exports.CreateColorDto = CreateColorDto;
//# sourceMappingURL=create-color.dto.js.map