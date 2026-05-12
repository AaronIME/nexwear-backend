"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class BrandEntity {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static fromObject(object) {
        const { id, _id, name } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('Brand id is missing');
        if (!name)
            throw custom_error_1.CustomError.badRequest('Brand name is missing');
        return new BrandEntity(id ?? _id, name);
    }
}
exports.BrandEntity = BrandEntity;
//# sourceMappingURL=brand.entity.js.map