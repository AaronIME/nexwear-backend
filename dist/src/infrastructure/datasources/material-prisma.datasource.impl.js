"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialPrismaDatasourceImpl = void 0;
const material_entity_1 = require("../../domain/entities/material.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
class MaterialPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.material.findUnique({ where: { name: dto.name } });
        if (existing)
            throw custom_error_1.CustomError.badRequest(`Material with name "${dto.name}" already exists`);
        const material = await this.prisma.material.create({
            data: { name: dto.name },
        });
        return material_entity_1.MaterialEntity.fromObject(material);
    }
    async findAll(dto) {
        const { page, limit } = dto;
        const skip = (page - 1) * limit;
        const [total, materials] = await this.prisma.$transaction([
            this.prisma.material.count(),
            this.prisma.material.findMany({
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
            next: page < pages ? `api/materials?page=${page + 1}&limit=${limit}` : undefined,
            prev: page > 1 ? `api/materials?page=${page - 1}&limit=${limit}` : undefined,
            materials: materials.map(material_entity_1.MaterialEntity.fromObject),
        };
    }
    async findById(id) {
        const material = await this.prisma.material.findUnique({ where: { id } });
        if (!material)
            throw custom_error_1.CustomError.notFound(`Material with id "${id}" not found`);
        return material_entity_1.MaterialEntity.fromObject(material);
    }
    async update(dto) {
        await this.findById(dto.id);
        if (dto.name) {
            const existing = await this.prisma.material.findUnique({ where: { name: dto.name } });
            if (existing && existing.id !== dto.id) {
                throw custom_error_1.CustomError.badRequest(`Material with name "${dto.name}" already exists`);
            }
        }
        const updated = await this.prisma.material.update({
            where: { id: dto.id },
            data: { ...(dto.name && { name: dto.name }) },
        });
        return material_entity_1.MaterialEntity.fromObject(updated);
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.material.delete({ where: { id } });
        return material_entity_1.MaterialEntity.fromObject(deleted);
    }
}
exports.MaterialPrismaDatasourceImpl = MaterialPrismaDatasourceImpl;
//# sourceMappingURL=material-prisma.datasource.impl.js.map