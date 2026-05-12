"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateColorDto = void 0;
const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
class UpdateColorDto {
    id;
    name;
    hex;
    constructor(id, name, hex) {
        this.id = id;
        this.name = name;
        this.hex = hex;
    }
    static create(object) {
        const { id, name, hex } = object;
        if (!id)
            return ['Id property is required'];
        if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
            return ['Name must be a non-empty string'];
        }
        if (hex !== undefined && !hexColorRegex.test(hex)) {
            return ['Hex must be a valid color code (e.g. #FFF or #FFFFFF)'];
        }
        return [undefined, new UpdateColorDto(id, name?.trim(), hex?.toUpperCase())];
    }
}
exports.UpdateColorDto = UpdateColorDto;
//# sourceMappingURL=update-color.dto.js.map