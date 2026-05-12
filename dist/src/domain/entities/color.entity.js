"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class ColorEntity {
    id;
    name;
    hex;
    constructor(id, name, hex) {
        this.id = id;
        this.name = name;
        this.hex = hex;
    }
    static fromObject(object) {
        const { id, _id, name, hex } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('Color id is missing');
        if (!name)
            throw custom_error_1.CustomError.badRequest('Color name is missing');
        if (!hex)
            throw custom_error_1.CustomError.badRequest('Color hex is missing');
        return new ColorEntity(id ?? _id, name, hex);
    }
}
exports.ColorEntity = ColorEntity;
//# sourceMappingURL=color.entity.js.map