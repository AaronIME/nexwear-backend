"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantPrismaDatasourceImpl = void 0;
const product_variant_entity_1 = require("../../domain/entities/product-variant.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
class ProductVariantPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const productExists = await this.prisma.product.findUnique({ where: { id: dto.productId } });
        if (!productExists)
            throw custom_error_1.CustomError.notFound(`Product with id "${dto.productId}" not found`);
        const skuExists = await this.prisma.productVariant.findUnique({ where: { sku: dto.sku } });
        if (skuExists)
            throw custom_error_1.CustomError.badRequest(`SKU "${dto.sku}" is already in use`);
        if (dto.colorId) {
            const colorExists = await this.prisma.color.findUnique({ where: { id: dto.colorId } });
            if (!colorExists)
                throw custom_error_1.CustomError.notFound(`Color with id "${dto.colorId}" not found`);
        }
        if (dto.sizeId) {
            const sizeExists = await this.prisma.size.findUnique({ where: { id: dto.sizeId } });
            if (!sizeExists)
                throw custom_error_1.CustomError.notFound(`Size with id "${dto.sizeId}" not found`);
        }
        const variant = await this.prisma.productVariant.create({
            data: {
                productId: dto.productId ?? null,
                sku: dto.sku ?? null,
                stock: dto.stock,
                colorId: dto.colorId ?? null,
                sizeId: dto.sizeId ?? null,
                price: dto.price ?? null,
            },
        });
        return product_variant_entity_1.ProductVariantEntity.fromObject(variant);
    }
    async findById(id) {
        const variant = await this.prisma.productVariant.findUnique({ where: { id } });
        if (!variant)
            throw custom_error_1.CustomError.notFound(`Product variant with id "${id}" not found`);
        return product_variant_entity_1.ProductVariantEntity.fromObject(variant);
    }
    async findByProductId(productId) {
        const variants = await this.prisma.productVariant.findMany({
            where: { productId },
            orderBy: { sku: 'asc' },
        });
        return variants.map(product_variant_entity_1.ProductVariantEntity.fromObject);
    }
    async update(dto) {
        await this.findById(dto.id);
        if (dto.sku) {
            const skuExists = await this.prisma.productVariant.findUnique({ where: { sku: dto.sku } });
            if (skuExists && skuExists.id !== dto.id) {
                throw custom_error_1.CustomError.badRequest(`SKU "${dto.sku}" is already in use`);
            }
        }
        if (dto.colorId) {
            const colorExists = await this.prisma.color.findUnique({ where: { id: dto.colorId } });
            if (!colorExists)
                throw custom_error_1.CustomError.notFound(`Color with id "${dto.colorId}" not found`);
        }
        if (dto.sizeId) {
            const sizeExists = await this.prisma.size.findUnique({ where: { id: dto.sizeId } });
            if (!sizeExists)
                throw custom_error_1.CustomError.notFound(`Size with id "${dto.sizeId}" not found`);
        }
        const updated = await this.prisma.productVariant.update({
            where: { id: dto.id },
            data: {
                ...(dto.sku && { sku: dto.sku }),
                ...(dto.stock !== undefined && { stock: dto.stock }),
                ...(dto.colorId !== undefined && { colorId: dto.colorId ?? null }),
                ...(dto.sizeId !== undefined && { sizeId: dto.sizeId ?? null }),
                ...(dto.price !== undefined && { price: dto.price ?? null }),
            },
        });
        return product_variant_entity_1.ProductVariantEntity.fromObject(updated);
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.productVariant.delete({ where: { id } });
        return product_variant_entity_1.ProductVariantEntity.fromObject(deleted);
    }
}
exports.ProductVariantPrismaDatasourceImpl = ProductVariantPrismaDatasourceImpl;
//# sourceMappingURL=product-variant-prisma.datasource.impl.js.map