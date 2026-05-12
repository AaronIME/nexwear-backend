"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorPrismaDatasourceImpl = void 0;
const color_entity_1 = require("../../domain/entities/color.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
class ColorPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.color.findUnique({ where: { name: dto.name } });
        if (existing)
            throw custom_error_1.CustomError.badRequest(`Color with name "${dto.name}" already exists`);
        const color = await this.prisma.color.create({
            data: { name: dto.name, hex: dto.hex },
        });
        return color_entity_1.ColorEntity.fromObject(color);
    }
    async findAll(dto) {
        const { page, limit } = dto;
        const skip = (page - 1) * limit;
        const [total, colors] = await this.prisma.$transaction([
            this.prisma.color.count(),
            this.prisma.color.findMany({
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
            next: page < pages ? `api/colors?page=${page + 1}&limit=${limit}` : undefined,
            prev: page > 1 ? `api/colors?page=${page - 1}&limit=${limit}` : undefined,
            colors: colors.map(color_entity_1.ColorEntity.fromObject),
        };
    }
    async findById(id) {
        const color = await this.prisma.color.findUnique({ where: { id } });
        if (!color)
            throw custom_error_1.CustomError.notFound(`Color with id "${id}" not found`);
        return color_entity_1.ColorEntity.fromObject(color);
    }
    async update(dto) {
        await this.findById(dto.id);
        if (dto.name) {
            const existing = await this.prisma.color.findUnique({ where: { name: dto.name } });
            if (existing && existing.id !== dto.id) {
                throw custom_error_1.CustomError.badRequest(`Color with name "${dto.name}" already exists`);
            }
        }
        const updated = await this.prisma.color.update({
            where: { id: dto.id },
            data: {
                ...(dto.name && { name: dto.name }),
                ...(dto.hex && { hex: dto.hex }),
            },
        });
        return color_entity_1.ColorEntity.fromObject(updated);
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.color.delete({ where: { id } });
        return color_entity_1.ColorEntity.fromObject(deleted);
    }
}
exports.ColorPrismaDatasourceImpl = ColorPrismaDatasourceImpl;
//# sourceMappingURL=color-prisma.datasource.impl.js.map