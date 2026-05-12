"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImageEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class ProductImageEntity {
    id;
    productId;
    url;
    order;
    constructor(id, productId, url, order) {
        this.id = id;
        this.productId = productId;
        this.url = url;
        this.order = order;
    }
    static fromObject(object) {
        const { id, _id, productId, url, order = 0 } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('ProductImage id is missing');
        if (!productId)
            throw custom_error_1.CustomError.badRequest('ProductImage productId is missing');
        if (!url)
            throw custom_error_1.CustomError.badRequest('ProductImage url is missing');
        return new ProductImageEntity(id ?? _id, productId, url, order);
    }
}
exports.ProductImageEntity = ProductImageEntity;
//# sourceMappingURL=product-image.entity.js.map