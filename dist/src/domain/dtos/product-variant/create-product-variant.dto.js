"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductVariantDto = void 0;
class CreateProductVariantDto {
    productId;
    sku;
    stock;
    colorId;
    sizeId;
    price;
    constructor(productId, sku, stock, colorId, sizeId, price) {
        this.productId = productId;
        this.sku = sku;
        this.stock = stock;
        this.colorId = colorId;
        this.sizeId = sizeId;
        this.price = price;
    }
    static create(object) {
        const { productId, sku, stock = 0, colorId, sizeId, price } = object;
        if (!productId)
            return ['ProductId property is required'];
        if (!sku)
            return ['Sku property is required'];
        if (typeof sku !== 'string' || sku.trim().length === 0)
            return ['Sku must be a non-empty string'];
        if (typeof stock !== 'number' || stock < 0)
            return ['Stock must be a non-negative integer'];
        if (price !== undefined && (typeof price !== 'number' || price < 0)) {
            return ['Price must be a non-negative number'];
        }
        return [
            undefined,
            new CreateProductVariantDto(productId, sku.trim().toUpperCase(), Math.floor(stock), colorId, sizeId, price),
        ];
    }
}
exports.CreateProductVariantDto = CreateProductVariantDto;
//# sourceMappingURL=create-product-variant.dto.js.map