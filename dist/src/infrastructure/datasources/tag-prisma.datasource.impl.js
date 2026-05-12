"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagPrismaDatasourceImpl = void 0;
const tag_entity_1 = require("../../domain/entities/tag.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
class TagPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.tag.findUnique({ where: { name: dto.name } });
        if (existing)
            throw custom_error_1.CustomError.badRequest(`Tag with name "${dto.name}" already exists`);
        const tag = await this.prisma.tag.create({
            data: { name: dto.name },
        });
        return tag_entity_1.TagEntity.fromObject(tag);
    }
    async findAll(dto) {
        const { page, limit } = dto;
        const skip = (page - 1) * limit;
        const [total, tags] = await this.prisma.$transaction([
            this.prisma.tag.count(),
            this.prisma.tag.findMany({
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
            next: page < pages ? `api/tags?page=${page + 1}&limit=${limit}` : undefined,
            prev: page > 1 ? `api/tags?page=${page - 1}&limit=${limit}` : undefined,
            tags: tags.map(tag_entity_1.TagEntity.fromObject),
        };
    }
    async findById(id) {
        const tag = await this.prisma.tag.findUnique({ where: { id } });
        if (!tag)
            throw custom_error_1.CustomError.notFound(`Tag with id "${id}" not found`);
        return tag_entity_1.TagEntity.fromObject(tag);
    }
    async update(dto) {
        await this.findById(dto.id);
        if (dto.name) {
            const existing = await this.prisma.tag.findUnique({ where: { name: dto.name } });
            if (existing && existing.id !== dto.id) {
                throw custom_error_1.CustomError.badRequest(`Tag with name "${dto.name}" already exists`);
            }
        }
        const updated = await this.prisma.tag.update({
            where: { id: dto.id },
            data: { ...(dto.name && { name: dto.name }) },
        });
        return tag_entity_1.TagEntity.fromObject(updated);
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.tag.delete({ where: { id } });
        return tag_entity_1.TagEntity.fromObject(deleted);
    }
}
exports.TagPrismaDatasourceImpl = TagPrismaDatasourceImpl;
//# sourceMappingURL=tag-prisma.datasource.impl.js.map