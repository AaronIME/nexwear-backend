"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantImagePrismaDatasourceImpl = void 0;
const product_variant_image_entity_1 = require("../../domain/entities/product-variant-image.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
class ProductVariantImagePrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const variantExists = await this.prisma.productVariant.findUnique({
            where: { id: dto.productVariantId },
        });
        if (!variantExists) {
            throw custom_error_1.CustomError.notFound(`ProductVariant with id "${dto.productVariantId}" not found`);
        }
        const productVariantImage = await this.prisma.productVariantImage.create({
            data: {
                productVariantId: dto.productVariantId,
                url: dto.url,
                order: dto.order,
            },
        });
        return product_variant_image_entity_1.ProductVariantImageEntity.fromObject(productVariantImage);
    }
    async findById(id) {
        const productVariantImage = await this.prisma.productVariantImage.findUnique({ where: { id } });
        if (!productVariantImage) {
            throw custom_error_1.CustomError.notFound(`ProductVariantImage with id "${id}" not found`);
        }
        return product_variant_image_entity_1.ProductVariantImageEntity.fromObject(productVariantImage);
    }
    async findByProductVariantId(productVariantId) {
        const images = await this.prisma.productVariantImage.findMany({
            where: { productVariantId },
            orderBy: { order: 'asc' },
        });
        return images.map(product_variant_image_entity_1.ProductVariantImageEntity.fromObject);
    }
    async update(dto) {
        await this.findById(dto.id);
        const updated = await this.prisma.productVariantImage.update({
            where: { id: dto.id },
            data: {
                ...(dto.url && { url: dto.url }),
                ...(dto.order !== undefined && { order: dto.order }),
            },
        });
        return product_variant_image_entity_1.ProductVariantImageEntity.fromObject(updated);
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.productVariantImage.delete({ where: { id } });
        return product_variant_image_entity_1.ProductVariantImageEntity.fromObject(deleted);
    }
}
exports.ProductVariantImagePrismaDatasourceImpl = ProductVariantImagePrismaDatasourceImpl;
//# sourceMappingURL=product-variant-image-prisma.datasource.impl.js.map