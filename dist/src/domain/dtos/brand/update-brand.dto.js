"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBrandDto = void 0;
class UpdateBrandDto {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static create(object) {
        const { id, name } = object;
        if (!id)
            return ['Id property is required'];
        if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
            return ['Name must be a non-empty string'];
        }
        return [undefined, new UpdateBrandDto(id, name?.trim())];
    }
}
exports.UpdateBrandDto = UpdateBrandDto;
//# sourceMappingURL=update-brand.dto.js.map