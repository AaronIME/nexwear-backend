"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductImageDto = void 0;
class CreateProductImageDto {
    productId;
    url;
    order;
    constructor(productId, url, order) {
        this.productId = productId;
        this.url = url;
        this.order = order;
    }
    static create(object) {
        const { productId, url, order = 0 } = object;
        if (!productId)
            return ['ProductId property is required'];
        if (!url)
            return ['Url property is required'];
        if (typeof url !== 'string' || url.trim().length === 0)
            return ['Url must be a non-empty string'];
        if (typeof order !== 'number' || order < 0)
            return ['Order must be a non-negative integer'];
        return [undefined, new CreateProductImageDto(productId, url.trim(), Math.floor(order))];
    }
}
exports.CreateProductImageDto = CreateProductImageDto;
//# sourceMappingURL=create-product-image.dto.js.map