"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class TagEntity {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static fromObject(object) {
        const { id, _id, name } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('Tag id is missing');
        if (!name)
            throw custom_error_1.CustomError.badRequest('Tag name is missing');
        return new TagEntity(id ?? _id, name);
    }
}
exports.TagEntity = TagEntity;
//# sourceMappingURL=tag.entity.js.map