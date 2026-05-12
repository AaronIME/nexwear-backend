"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryPrismaDatasourceImpl = void 0;
const category_entity_1 = require("../../domain/entities/category.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
class CategoryPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.category.findUnique({ where: { name: dto.name } });
        if (existing)
            throw custom_error_1.CustomError.badRequest(`Category with name "${dto.name}" already exists`);
        const category = await this.prisma.category.create({
            data: {
                name: dto.name,
            },
        });
        return category_entity_1.CategoryEntity.fromObject(category);
    }
    async findAll(dto) {
        const { page, limit } = dto;
        const skip = (page - 1) * limit;
        const [total, categories] = await this.prisma.$transaction([
            this.prisma.category.count(),
            this.prisma.category.findMany({
                skip,
                take: limit,
                orderBy: { name: 'asc' },
            }),
        ]);
        const pages = Math.ceil(total / limit);
        return {
            page,
            limit,
            total,
            pages,
            next: page < pages ? `api/categories?page=${page + 1}&limit=${limit}` : undefined,
            prev: page > 1 ? `api/categories?page=${page - 1}&limit=${limit}` : undefined,
            categories: categories.map(category_entity_1.CategoryEntity.fromObject),
        };
    }
    async findById(id) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category)
            throw custom_error_1.CustomError.notFound(`Category with id "${id}" not found`);
        return category_entity_1.CategoryEntity.fromObject(category);
    }
    async update(dto) {
        await this.findById(dto.id);
        if (dto.name) {
            const existing = await this.prisma.category.findUnique({ where: { name: dto.name } });
            if (existing && existing.id !== dto.id) {
                throw custom_error_1.CustomError.badRequest(`Category with name "${dto.name}" already exists`);
            }
        }
        const updated = await this.prisma.category.update({
            where: { id: dto.id },
            data: {
                ...(dto.name && { name: dto.name }),
            },
        });
        return category_entity_1.CategoryEntity.fromObject(updated);
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.category.delete({ where: { id } });
        return category_entity_1.CategoryEntity.fromObject(deleted);
    }
}
exports.CategoryPrismaDatasourceImpl = CategoryPrismaDatasourceImpl;
//# sourceMappingURL=category-prisma.datasource.impl.js.map