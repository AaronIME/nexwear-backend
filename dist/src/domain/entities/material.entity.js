"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class MaterialEntity {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static fromObject(object) {
        console.log({ object });
        const { id, _id, name } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('Material id is missing');
        if (!name)
            throw custom_error_1.CustomError.badRequest('Material name is missing');
        return new MaterialEntity(id ?? _id, name);
    }
}
exports.MaterialEntity = MaterialEntity;
//# sourceMappingURL=material.entity.js.map