"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class SizeEntity {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static fromObject(object) {
        const { id, _id, name } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('Size id is missing');
        if (!name)
            throw custom_error_1.CustomError.badRequest('Size name is missing');
        return new SizeEntity(id ?? _id, name);
    }
}
exports.SizeEntity = SizeEntity;
//# sourceMappingURL=size.entity.js.map