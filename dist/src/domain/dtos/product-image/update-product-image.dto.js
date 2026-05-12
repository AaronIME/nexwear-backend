"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductImageDto = void 0;
class UpdateProductImageDto {
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
        if (url !== undefined && (typeof url !== 'string' || url.trim().length === 0)) {
            return ['Url must be a non-empty string'];
        }
        if (order !== undefined && (typeof order !== 'number' || order < 0)) {
            return ['Order must be a non-negative integer'];
        }
        return [undefined, new UpdateProductImageDto(id, url?.trim(), order !== undefined ? Math.floor(order) : undefined)];
    }
}
exports.UpdateProductImageDto = UpdateProductImageDto;
//# sourceMappingURL=update-product-image.dto.js.map