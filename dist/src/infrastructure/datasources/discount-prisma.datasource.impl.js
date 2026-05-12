"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountPrismaDatasourceImpl = void 0;
const discount_entity_1 = require("../../domain/entities/discount.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
class DiscountPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.discount.findUnique({ where: { name: dto.name } });
        if (existing)
            throw custom_error_1.CustomError.badRequest(`Discount with name "${dto.name}" already exists`);
        const discount = await this.prisma.discount.create({
            data: {
                name: dto.name,
                percentage: dto.percentage,
                startDate: dto.startDate,
                endDate: dto.endDate,
            },
        });
        return discount_entity_1.DiscountEntity.fromObject(discount);
    }
    async findAll(dto) {
        const { page, limit } = dto;
        const skip = (page - 1) * limit;
        const [total, discounts] = await this.prisma.$transaction([
            this.prisma.discount.count(),
            this.prisma.discount.findMany({
                skip,
                take: limit,
                orderBy: { startDate: 'desc' },
            }),
        ]);
        const pages = Math.ceil(total / limit);
        return {
            page,
            limit,
            total,
            pages,
            next: page < pages ? `api/discounts?page=${page + 1}&limit=${limit}` : undefined,
            prev: page > 1 ? `api/discounts?page=${page - 1}&limit=${limit}` : undefined,
            discounts: discounts.map(discount_entity_1.DiscountEntity.fromObject),
        };
    }
    async findById(id) {
        const discount = await this.prisma.discount.findUnique({ where: { id } });
        if (!discount)
            throw custom_error_1.CustomError.notFound(`Discount with id "${id}" not found`);
        return discount_entity_1.DiscountEntity.fromObject(discount);
    }
    async update(dto) {
        await this.findById(dto.id);
        if (dto.name) {
            const existing = await this.prisma.discount.findUnique({ where: { name: dto.name } });
            if (existing && existing.id !== dto.id) {
                throw custom_error_1.CustomError.badRequest(`Discount with name "${dto.name}" already exists`);
            }
        }
        const updated = await this.prisma.discount.update({
            where: { id: dto.id },
            data: {
                ...(dto.name && { name: dto.name }),
                ...(dto.percentage !== undefined && { percentage: dto.percentage }),
                ...(dto.startDate && { startDate: dto.startDate }),
                ...(dto.endDate && { endDate: dto.endDate }),
            },
        });
        return discount_entity_1.DiscountEntity.fromObject(updated);
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.discount.delete({ where: { id } });
        return discount_entity_1.DiscountEntity.fromObject(deleted);
    }
}
exports.DiscountPrismaDatasourceImpl = DiscountPrismaDatasourceImpl;
//# sourceMappingURL=discount-prisma.datasource.impl.js.map