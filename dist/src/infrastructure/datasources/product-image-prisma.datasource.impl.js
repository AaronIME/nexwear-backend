"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImagePrismaDatasourceImpl = void 0;
const product_image_entity_1 = require("../../domain/entities/product-image.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
class ProductImagePrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const productExists = await this.prisma.product.findUnique({ where: { id: dto.productId } });
        if (!productExists)
            throw custom_error_1.CustomError.notFound(`Product with id "${dto.productId}" not found`);
        const image = await this.prisma.productImage.create({
            data: {
                productId: dto.productId,
                url: dto.url,
                order: dto.order,
            },
        });
        return product_image_entity_1.ProductImageEntity.fromObject(image);
    }
    async findById(id) {
        const image = await this.prisma.productImage.findUnique({ where: { id } });
        if (!image)
            throw custom_error_1.CustomError.notFound(`Product image with id "${id}" not found`);
        return product_image_entity_1.ProductImageEntity.fromObject(image);
    }
    async findByProductId(productId) {
        const images = await this.prisma.productImage.findMany({
            where: { productId },
            orderBy: { order: 'asc' },
        });
        return images.map(product_image_entity_1.ProductImageEntity.fromObject);
    }
    async update(dto) {
        await this.findById(dto.id);
        const updated = await this.prisma.productImage.update({
            where: { id: dto.id },
            data: {
                ...(dto.url && { url: dto.url }),
                ...(dto.order !== undefined && { order: dto.order }),
            },
        });
        return product_image_entity_1.ProductImageEntity.fromObject(updated);
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.productImage.delete({ where: { id } });
        return product_image_entity_1.ProductImageEntity.fromObject(deleted);
    }
}
exports.ProductImagePrismaDatasourceImpl = ProductImagePrismaDatasourceImpl;
//# sourceMappingURL=product-image-prisma.datasource.impl.js.map