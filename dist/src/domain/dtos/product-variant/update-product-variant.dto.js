"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductVariantDto = void 0;
class UpdateProductVariantDto {
    id;
    sku;
    stock;
    colorId;
    sizeId;
    price;
    constructor(id, sku, stock, colorId, sizeId, price) {
        this.id = id;
        this.sku = sku;
        this.stock = stock;
        this.colorId = colorId;
        this.sizeId = sizeId;
        this.price = price;
    }
    static create(object) {
        const { id, sku, stock, colorId, sizeId, price } = object;
        if (!id)
            return ['Id property is required'];
        if (sku !== undefined && (typeof sku !== 'string' || sku.trim().length === 0)) {
            return ['Sku must be a non-empty string'];
        }
        if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
            return ['Stock must be a non-negative integer'];
        }
        if (price !== undefined && (typeof price !== 'number' || price < 0)) {
            return ['Price must be a non-negative number'];
        }
        return [
            undefined,
            new UpdateProductVariantDto(id, sku !== undefined ? sku.trim().toUpperCase() : undefined, stock !== undefined ? Math.floor(stock) : undefined, colorId, sizeId, price),
        ];
    }
}
exports.UpdateProductVariantDto = UpdateProductVariantDto;
//# sourceMappingURL=update-product-variant.dto.js.map