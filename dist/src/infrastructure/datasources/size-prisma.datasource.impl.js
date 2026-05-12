"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizePrismaDatasourceImpl = void 0;
const size_entity_1 = require("../../domain/entities/size.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
class SizePrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.size.findUnique({ where: { name: dto.name } });
        if (existing)
            throw custom_error_1.CustomError.badRequest(`Size with name "${dto.name}" already exists`);
        const size = await this.prisma.size.create({
            data: { name: dto.name },
        });
        return size_entity_1.SizeEntity.fromObject(size);
    }
    async findAll(dto) {
        const { page, limit } = dto;
        const skip = (page - 1) * limit;
        const [total, sizes] = await this.prisma.$transaction([
            this.prisma.size.count(),
            this.prisma.size.findMany({
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
            next: page < pages ? `api/sizes?page=${page + 1}&limit=${limit}` : undefined,
            prev: page > 1 ? `api/sizes?page=${page - 1}&limit=${limit}` : undefined,
            sizes: sizes.map(size_entity_1.SizeEntity.fromObject),
        };
    }
    async findById(id) {
        const size = await this.prisma.size.findUnique({ where: { id } });
        if (!size)
            throw custom_error_1.CustomError.notFound(`Size with id "${id}" not found`);
        return size_entity_1.SizeEntity.fromObject(size);
    }
    async update(dto) {
        await this.findById(dto.id);
        if (dto.name) {
            const existing = await this.prisma.size.findUnique({ where: { name: dto.name } });
            if (existing && existing.id !== dto.id) {
                throw custom_error_1.CustomError.badRequest(`Size with name "${dto.name}" already exists`);
            }
        }
        const updated = await this.prisma.size.update({
            where: { id: dto.id },
            data: { ...(dto.name && { name: dto.name }) },
        });
        return size_entity_1.SizeEntity.fromObject(updated);
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.size.delete({ where: { id } });
        return size_entity_1.SizeEntity.fromObject(deleted);
    }
}
exports.SizePrismaDatasourceImpl = SizePrismaDatasourceImpl;
//# sourceMappingURL=size-prisma.datasource.impl.js.map