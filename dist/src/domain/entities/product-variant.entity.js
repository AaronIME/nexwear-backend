"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class ProductVariantEntity {
    id;
    productId;
    sku;
    stock;
    soldCount;
    isActive;
    isDeleted;
    colorId;
    sizeId;
    price;
    image;
    color;
    size;
    constructor(id, productId, sku, stock, soldCount, isActive, isDeleted, colorId, sizeId, price, image, color, size) {
        this.id = id;
        this.productId = productId;
        this.sku = sku;
        this.stock = stock;
        this.soldCount = soldCount;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
        this.colorId = colorId;
        this.sizeId = sizeId;
        this.price = price;
        this.image = image;
        this.color = color;
        this.size = size;
    }
    static fromObject(object) {
        const { id, _id, productId, sku, stock = 0, soldCount = 0, isActive = true, isDeleted = false, colorId, sizeId, price, image, color, size, } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('ProductVariant id is missing');
        if (!productId)
            throw custom_error_1.CustomError.badRequest('ProductVariant productId is missing');
        if (!sku)
            throw custom_error_1.CustomError.badRequest('ProductVariant sku is missing');
        const label = (rel) => {
            if (rel == null)
                return undefined;
            if (typeof rel === 'object' && rel !== null && 'name' in rel) {
                const n = rel.name;
                if (typeof n === 'string')
                    return n;
            }
            if (typeof rel === 'string')
                return rel;
            return undefined;
        };
        const imageUrl = () => {
            if (typeof image === 'string')
                return image;
            if (image && typeof image === 'object' && 'url' in image && typeof image.url === 'string') {
                return image.url;
            }
            return undefined;
        };
        return new ProductVariantEntity(id ?? _id, productId, sku, stock, soldCount, Boolean(isActive), Boolean(isDeleted), colorId, sizeId, price, imageUrl(), label(color), label(size));
    }
}
exports.ProductVariantEntity = ProductVariantEntity;
//# sourceMappingURL=product-variant.entity.js.map