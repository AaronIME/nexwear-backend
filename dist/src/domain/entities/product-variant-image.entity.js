"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantImageEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class ProductVariantImageEntity {
    id;
    productVariantId;
    url;
    order;
    constructor(id, productVariantId, url, order) {
        this.id = id;
        this.productVariantId = productVariantId;
        this.url = url;
        this.order = order;
    }
    static fromObject(object) {
        const { id, _id, productVariantId, url, order } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('ProductVariantImage id is missing');
        if (!productVariantId)
            throw custom_error_1.CustomError.badRequest('ProductVariantImage productVariantId is missing');
        if (!url)
            throw custom_error_1.CustomError.badRequest('ProductVariantImage url is missing');
        if (order === undefined || order === null)
            throw custom_error_1.CustomError.badRequest('ProductVariantImage order is missing');
        return new ProductVariantImageEntity(id ?? _id, productVariantId, url, order);
    }
}
exports.ProductVariantImageEntity = ProductVariantImageEntity;
//# sourceMappingURL=product-variant-image.entity.js.map