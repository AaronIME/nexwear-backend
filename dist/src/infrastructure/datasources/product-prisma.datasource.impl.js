"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPrismaDatasourceImpl = void 0;
const client_1 = require("../../../generated/prisma/client");
const product_entity_1 = require("../../domain/entities/product.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
const product_list_entity_1 = require("../../domain/entities/product-list.entity");
const product_detail_entity_1 = require("../../domain/entities/product-detail.entity");
const brand_entity_1 = require("../../domain/entities/brand.entity");
const category_entity_1 = require("../../domain/entities/category.entity");
const discount_entity_1 = require("../../domain/entities/discount.entity");
const color_entity_1 = require("../../domain/entities/color.entity");
const size_entity_1 = require("../../domain/entities/size.entity");
const tag_entity_1 = require("../../domain/entities/tag.entity");
const material_entity_1 = require("../../domain/entities/material.entity");
class ProductPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        await this.validateRelations(dto);
        const product = await this.prisma.product.create({
            data: {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                gender: dto.gender,
                brandId: dto.brandId ?? null,
                categoryId: dto.categoryId ?? null,
                discountId: dto.discountId ?? null,
                ...(dto.tagIds?.length && {
                    tags: { create: dto.tagIds.map((tagId) => ({ tagId })) },
                }),
                ...(dto.materialIds?.length && {
                    materials: {
                        create: dto.materialIds.map((materialId) => ({ materialId })),
                    },
                }),
            },
        });
        return product_entity_1.ProductEntity.fromObject(product);
    }
    async findAll(pagination, filters) {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;
        const { search, categoryId, brandId, colorId, sizeId, materialId, tagId, discountId, gender, minPrice, maxPrice, inStock, sortBy } = filters ?? {};
        const [brand, category, discount, color, size, material, tag] = await Promise.all([
            brandId ? this.prisma.brand.findUnique({ where: { id: brandId } }) : undefined,
            categoryId ? this.prisma.category.findUnique({ where: { id: categoryId } }) : undefined,
            discountId ? this.prisma.discount.findUnique({ where: { id: discountId } }) : undefined,
            colorId ? this.prisma.color.findUnique({ where: { id: colorId } }) : undefined,
            sizeId ? this.prisma.size.findUnique({ where: { id: sizeId } }) : undefined,
            materialId ? this.prisma.material.findUnique({ where: { id: materialId } }) : undefined,
            tagId ? this.prisma.tag.findUnique({ where: { id: tagId } }) : undefined,
        ]);
        const isGenderValid = gender && Object.values(client_1.Gender).includes(gender);
        const isMinPriceValid = minPrice !== undefined && !isNaN(Number(minPrice)) && Number(minPrice) >= 0;
        const isMaxPriceValid = maxPrice !== undefined && !isNaN(Number(maxPrice)) && Number(maxPrice) >= 0;
        const isInStockValid = inStock !== undefined && (inStock === true || inStock === false);
        const validFilters = {
            search: search ?? undefined,
            brandId: brand ? brandId : undefined,
            categoryId: category ? categoryId : undefined,
            discountId: discount ? discountId : undefined,
            colorId: color ? colorId : undefined,
            sizeId: size ? sizeId : undefined,
            materialId: material ? materialId : undefined,
            tagId: tag ? tagId : undefined,
            gender: isGenderValid ? gender : undefined,
            minPrice: isMinPriceValid ? minPrice : undefined,
            maxPrice: isMaxPriceValid ? maxPrice : undefined,
            inStock: isInStockValid ? inStock : undefined,
            sortBy: sortBy ?? undefined,
        };
        const responseFilters = {
            search: search ?? undefined,
            brand: brand ? brand_entity_1.BrandEntity.fromObject(brand) : undefined,
            category: category ? category_entity_1.CategoryEntity.fromObject(category) : undefined,
            discount: discount ? discount_entity_1.DiscountEntity.fromObject(discount) : undefined,
            color: color ? color_entity_1.ColorEntity.fromObject(color) : undefined,
            size: size ? size_entity_1.SizeEntity.fromObject(size) : undefined,
            material: material ? material_entity_1.MaterialEntity.fromObject(material) : undefined,
            tag: tag ? tag_entity_1.TagEntity.fromObject(tag) : undefined,
            gender: isGenderValid ? gender : undefined,
            minPrice: isMinPriceValid ? minPrice : undefined,
            maxPrice: isMaxPriceValid ? maxPrice : undefined,
            inStock: isInStockValid ? inStock : undefined,
            sortBy: sortBy ?? undefined,
        };
        const where = this.buildWhereClause(validFilters);
        const orderBy = this.buildOrderBy(sortBy);
        const [total, products, productFilters] = await Promise.all([
            this.prisma.product.count({ where }),
            this.prisma.product.findMany({
                where,
                include: {
                    brand: true,
                    category: true,
                    discount: true,
                    images: {
                        orderBy: { order: "asc" },
                        take: 1,
                    },
                },
                skip,
                take: limit,
                orderBy,
            }),
            this.getAvailableFilters(where),
        ]);
        const pages = Math.ceil(total / limit);
        const query = this.buildQueryString(validFilters);
        return {
            page,
            limit,
            total,
            pages,
            next: page < pages
                ? `api/products?page=${page + 1}&limit=${limit}${query}`
                : undefined,
            prev: page > 1
                ? `api/products?page=${page - 1}&limit=${limit}${query}`
                : undefined,
            products: products.map(product_list_entity_1.ProductListEntity.fromObject),
            productFilters,
            filters: filters
                ? responseFilters
                : undefined,
        };
    }
    async findById(id) {
        const product = await this.prisma.product.findUnique({ where: { id }, include: {
                brand: true,
                category: true,
                discount: true,
                images: true,
                variants: {
                    include: {
                        color: true,
                        size: true,
                    },
                },
                tags: {
                    include: {
                        tag: true,
                    },
                },
                materials: {
                    include: {
                        material: true,
                    },
                },
            } });
        if (!product)
            throw custom_error_1.CustomError.notFound(`Product with id "${id}" not found`);
        return product_detail_entity_1.ProductDetailEntity.fromObject(product);
    }
    async update(dto) {
        await this.findById(dto.id);
        await this.validateRelations(dto);
        const updated = await this.prisma.product.update({
            where: { id: dto.id },
            data: {
                ...(dto.name && { name: dto.name }),
                ...(dto.description && { description: dto.description }),
                ...(dto.price !== undefined && { price: dto.price }),
                ...(dto.gender && { gender: dto.gender }),
                ...(dto.soldCount !== undefined && { soldCount: dto.soldCount }),
                ...(dto.brandId !== undefined && { brandId: dto.brandId ?? null }),
                ...(dto.categoryId !== undefined && {
                    categoryId: dto.categoryId ?? null,
                }),
                ...(dto.discountId !== undefined && {
                    discountId: dto.discountId ?? null,
                }),
                ...(dto.tagIds && {
                    tags: {
                        deleteMany: {},
                        create: dto.tagIds.map((tagId) => ({ tagId })),
                    },
                }),
                ...(dto.materialIds && {
                    materials: {
                        deleteMany: {},
                        create: dto.materialIds.map((materialId) => ({ materialId })),
                    },
                }),
            },
        });
        return product_entity_1.ProductEntity.fromObject(updated);
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.product.delete({ where: { id } });
        return product_entity_1.ProductEntity.fromObject(deleted);
    }
    buildWhereClause(filters) {
        if (!filters)
            return {};
        console.log({ filters });
        const { search, categoryId, brandId, colorId, sizeId, materialId, tagId, discountId, gender, minPrice, maxPrice, inStock, } = filters;
        return {
            ...(search && {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { description: { contains: search, mode: "insensitive" } },
                ],
            }),
            ...(categoryId && { categoryId }),
            ...(brandId && { brandId }),
            ...(discountId && { discountId }),
            ...(gender && { gender }),
            ...(minPrice !== undefined || maxPrice !== undefined
                ? {
                    price: {
                        ...(minPrice !== undefined && { gte: minPrice }),
                        ...(maxPrice !== undefined && { lte: maxPrice }),
                    },
                }
                : {}),
            ...(tagId && { tags: { some: { tagId } } }),
            ...(materialId && { materials: { some: { materialId } } }),
            ...((colorId || sizeId || inStock !== undefined) && {
                variants: {
                    some: {
                        ...(colorId && { colorId }),
                        ...(sizeId && { sizeId }),
                        ...(inStock === true && { stock: { gt: 0 } }),
                        ...(inStock === false && { stock: 0 }),
                    },
                },
            }),
        };
    }
    buildQueryString(filters) {
        if (!filters)
            return "";
        const params = [];
        const { search, categoryId, brandId, colorId, sizeId, materialId, tagId, discountId, gender, minPrice, maxPrice, inStock, sortBy, } = filters;
        if (search)
            params.push(`search=${search}`);
        if (categoryId)
            params.push(`categoryId=${categoryId}`);
        if (brandId)
            params.push(`brandId=${brandId}`);
        if (colorId)
            params.push(`colorId=${colorId}`);
        if (sizeId)
            params.push(`sizeId=${sizeId}`);
        if (materialId)
            params.push(`materialId=${materialId}`);
        if (tagId)
            params.push(`tagId=${tagId}`);
        if (discountId)
            params.push(`discountId=${discountId}`);
        if (gender)
            params.push(`gender=${gender}`);
        if (minPrice !== undefined)
            params.push(`minPrice=${minPrice}`);
        if (maxPrice !== undefined)
            params.push(`maxPrice=${maxPrice}`);
        if (inStock !== undefined)
            params.push(`inStock=${inStock}`);
        if (sortBy)
            params.push(`sortBy=${sortBy}`);
        return params.length ? `&${params.join("&")}` : "";
    }
    buildOrderBy(sortBy) {
        switch (sortBy) {
            case 'price-asc':
                return { price: 'asc' };
            case 'price-desc':
                return { price: 'desc' };
            case 'rating':
                return [{ averageRating: 'desc' }, { reviewCount: 'desc' }];
            case 'best-selling':
                return [{ soldCount: 'desc' }, { averageRating: 'desc' }];
            case 'newest':
            default:
                return { createdAt: 'desc' };
        }
    }
    async validateRelations(dto) {
        if (dto.brandId) {
            const exists = await this.prisma.brand.findUnique({
                where: { id: dto.brandId },
            });
            if (!exists)
                throw custom_error_1.CustomError.notFound(`Brand with id "${dto.brandId}" not found`);
        }
        if (dto.categoryId) {
            const exists = await this.prisma.category.findUnique({
                where: { id: dto.categoryId },
            });
            if (!exists)
                throw custom_error_1.CustomError.notFound(`Category with id "${dto.categoryId}" not found`);
        }
        if (dto.discountId) {
            const exists = await this.prisma.discount.findUnique({
                where: { id: dto.discountId },
            });
            if (!exists)
                throw custom_error_1.CustomError.notFound(`Discount with id "${dto.discountId}" not found`);
        }
        if (dto.tagIds?.length) {
            const tags = await this.prisma.tag.findMany({
                where: { id: { in: dto.tagIds } },
            });
            if (tags.length !== dto.tagIds.length)
                throw custom_error_1.CustomError.notFound("One or more tags were not found");
        }
        if (dto.materialIds?.length) {
            const materials = await this.prisma.material.findMany({
                where: { id: { in: dto.materialIds } },
            });
            if (materials.length !== dto.materialIds.length)
                throw custom_error_1.CustomError.notFound("One or more materials were not found");
        }
    }
    async getAvailableFilters(where) {
        const [brands, categories, discounts, colors, sizes, tags, materials, priceRange] = await Promise.all([
            this.prisma.brand.findMany({
                where: {
                    products: { some: where },
                },
                distinct: ['id'],
            }),
            this.prisma.category.findMany({
                where: {
                    products: { some: where },
                },
                distinct: ['id'],
            }),
            this.prisma.discount.findMany({
                where: {
                    products: { some: where },
                },
                distinct: ['id'],
            }),
            this.prisma.color.findMany({
                where: {
                    variants: {
                        some: {
                            product: where,
                        },
                    },
                },
                distinct: ['id'],
            }),
            this.prisma.size.findMany({
                where: {
                    variants: {
                        some: {
                            product: where,
                        },
                    },
                },
                distinct: ['id'],
            }),
            this.prisma.tag.findMany({
                where: {
                    products: {
                        some: {
                            product: where,
                        },
                    },
                },
                distinct: ['id'],
            }),
            this.prisma.material.findMany({
                where: {
                    products: {
                        some: {
                            product: where,
                        },
                    },
                },
                distinct: ['id'],
            }),
            this.prisma.product.aggregate({
                where,
                _min: { price: true },
                _max: { price: true },
            }),
        ]);
        return {
            brands: brands.map(brand_entity_1.BrandEntity.fromObject),
            categories: categories.map(category_entity_1.CategoryEntity.fromObject),
            discounts: discounts.map(discount_entity_1.DiscountEntity.fromObject),
            colors: colors.map(color_entity_1.ColorEntity.fromObject),
            sizes: sizes.map(size_entity_1.SizeEntity.fromObject),
            tags: tags.map(tag_entity_1.TagEntity.fromObject),
            materials: materials.map(material_entity_1.MaterialEntity.fromObject),
            minPrice: priceRange._min.price ?? 0,
            maxPrice: priceRange._max.price ?? 0,
        };
    }
}
exports.ProductPrismaDatasourceImpl = ProductPrismaDatasourceImpl;
//# sourceMappingURL=product-prisma.datasource.impl.js.map