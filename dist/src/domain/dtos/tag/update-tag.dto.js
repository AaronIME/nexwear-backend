"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTagDto = void 0;
class UpdateTagDto {
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
        return [undefined, new UpdateTagDto(id, name?.trim())];
    }
}
exports.UpdateTagDto = UpdateTagDto;
//# sourceMappingURL=update-tag.dto.js.map