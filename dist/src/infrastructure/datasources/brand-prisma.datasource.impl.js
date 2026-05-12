"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandPrismaDatasourceImpl = void 0;
const brand_entity_1 = require("../../domain/entities/brand.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
class BrandPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.brand.findUnique({ where: { name: dto.name } });
        if (existing)
            throw custom_error_1.CustomError.badRequest(`Brand with name "${dto.name}" already exists`);
        const brand = await this.prisma.brand.create({
            data: { name: dto.name },
        });
        return brand_entity_1.BrandEntity.fromObject(brand);
    }
    async findAll(dto) {
        const { page, limit } = dto;
        const skip = (page - 1) * limit;
        const [total, brands] = await this.prisma.$transaction([
            this.prisma.brand.count(),
            this.prisma.brand.findMany({
                skip,
                take: limit,
                orderBy: { name: 'asc' },
            }),
        ]);
        const pages = Math.ceil(total / limit);
        console.log({ brands });
        return {
            page,
            limit,
            total,
            pages,
            next: page < pages ? `api/brands?page=${page + 1}&limit=${limit}` : undefined,
            prev: page > 1 ? `api/brands?page=${page - 1}&limit=${limit}` : undefined,
            brands: brands.map(brand_entity_1.BrandEntity.fromObject),
        };
    }
    async findById(id) {
        const brand = await this.prisma.brand.findUnique({ where: { id } });
        if (!brand)
            throw custom_error_1.CustomError.notFound(`Brand with id "${id}" not found`);
        return brand_entity_1.BrandEntity.fromObject(brand);
    }
    async update(dto) {
        await this.findById(dto.id);
        if (dto.name) {
            const existing = await this.prisma.brand.findUnique({ where: { name: dto.name } });
            if (existing && existing.id !== dto.id) {
                throw custom_error_1.CustomError.badRequest(`Brand with name "${dto.name}" already exists`);
            }
        }
        const updated = await this.prisma.brand.update({
            where: { id: dto.id },
            data: { ...(dto.name && { name: dto.name }) },
        });
        return brand_entity_1.BrandEntity.fromObject(updated);
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.brand.delete({ where: { id } });
        return brand_entity_1.BrandEntity.fromObject(deleted);
    }
}
exports.BrandPrismaDatasourceImpl = BrandPrismaDatasourceImpl;
//# sourceMappingURL=brand-prisma.datasource.impl.js.map