"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductVariantImageDto = void 0;
class UpdateProductVariantImageDto {
    id;
    url;
    order;
    constructor(id, url, order) {
        this.id = id;
        this.url = url;
        this.order = order;
    }
    static create(object) {
        const { id, url, order } = object;
        if (!id)
            return ['Id property is required'];
        if (typeof id !== 'string' || id.trim().length === 0) {
            return ['Id must be a non-empty string'];
        }
        if (url !== undefined && (typeof url !== 'string' || url.trim().length === 0)) {
            return ['Url must be a non-empty string'];
        }
        if (order !== undefined && (typeof order !== 'number' || order < 0)) {
            return ['Order must be a non-negative number'];
        }
        return [undefined, new UpdateProductVariantImageDto(id.trim(), url?.trim(), order)];
    }
}
exports.UpdateProductVariantImageDto = UpdateProductVariantImageDto;
//# sourceMappingURL=update-product-variant-image.dto.js.map