"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportRequestPrismaDatasourceImpl = void 0;
const support_request_entity_1 = require("../../domain/entities/support-request.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
const support_status_type_1 = require("../../domain/types/support-status.type");
const CLOSEABLE_STATUSES = [support_status_type_1.SupportStatus.RESOLVED];
class SupportRequestPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const userExists = await this.prisma.user.findUnique({ where: { id: dto.userId } });
        if (!userExists)
            throw custom_error_1.CustomError.notFound(`User with id "${dto.userId}" not found`);
        const supportRequest = await this.prisma.supportRequest.create({
            data: {
                userId: dto.userId,
                subject: dto.subject,
                message: dto.message,
                status: support_status_type_1.SupportStatus.OPEN,
            },
        });
        return support_request_entity_1.SupportRequestEntity.fromObject(supportRequest);
    }
    async findAll(dto) {
        const { page, limit } = dto;
        const skip = (page - 1) * limit;
        const [total, supportRequests] = await this.prisma.$transaction([
            this.prisma.supportRequest.count(),
            this.prisma.supportRequest.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
        ]);
        const pages = Math.ceil(total / limit);
        return {
            page,
            limit,
            total,
            pages,
            next: page < pages ? `api/support-requests?page=${page + 1}&limit=${limit}` : undefined,
            prev: page > 1 ? `api/support-requests?page=${page - 1}&limit=${limit}` : undefined,
            supportRequests: supportRequests.map(support_request_entity_1.SupportRequestEntity.fromObject),
        };
    }
    async findById(id) {
        const supportRequest = await this.prisma.supportRequest.findUnique({ where: { id } });
        if (!supportRequest)
            throw custom_error_1.CustomError.notFound(`Support request with id "${id}" not found`);
        return support_request_entity_1.SupportRequestEntity.fromObject(supportRequest);
    }
    async findByUserId(userId, dto) {
        const { page, limit } = dto;
        const skip = (page - 1) * limit;
        const [total, supportRequests] = await this.prisma.$transaction([
            this.prisma.supportRequest.count({ where: { userId } }),
            this.prisma.supportRequest.findMany({
                where: { userId },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
        ]);
        const pages = Math.ceil(total / limit);
        return {
            page,
            limit,
            total,
            pages,
            next: page < pages ? `api/support-requests?page=${page + 1}&limit=${limit}` : undefined,
            prev: page > 1 ? `api/support-requests?page=${page - 1}&limit=${limit}` : undefined,
            supportRequests: supportRequests.map(support_request_entity_1.SupportRequestEntity.fromObject),
        };
    }
    async updateStatus(dto) {
        const supportRequest = await this.findById(dto.id);
        if (supportRequest.status === support_status_type_1.SupportStatus.CLOSED) {
            throw custom_error_1.CustomError.badRequest('Cannot update the status of a closed support request');
        }
        if (dto.status === support_status_type_1.SupportStatus.OPEN && !CLOSEABLE_STATUSES.includes(supportRequest.status)) {
            throw custom_error_1.CustomError.badRequest('A support request can only be reopened from RESOLVED status');
        }
        const updated = await this.prisma.supportRequest.update({
            where: { id: dto.id },
            data: { status: dto.status },
        });
        return support_request_entity_1.SupportRequestEntity.fromObject(updated);
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.supportRequest.delete({ where: { id } });
        return support_request_entity_1.SupportRequestEntity.fromObject(deleted);
    }
}
exports.SupportRequestPrismaDatasourceImpl = SupportRequestPrismaDatasourceImpl;
//# sourceMappingURL=support-request-prisma.datasource.impl.js.map