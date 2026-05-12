"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogPrismaDatasourceImpl = void 0;
const custom_error_1 = require("../../domain/entities/errors/custom.error");
const log_entity_1 = require("../../domain/entities/log.entity");
class LogPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const log = await this.prisma.log.create({
            data: {
                level: dto.level,
                message: dto.message,
                service: dto.service,
            },
        });
        return log_entity_1.LogEntity.fromObject(log);
    }
    async findAll(dto) {
        const { page, limit } = dto;
        const [total, logs] = await Promise.all([
            this.prisma.log.count(),
            this.prisma.log.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { timestamp: 'desc' },
            }),
        ]);
        const pages = Math.ceil(total / limit);
        return {
            page,
            limit,
            total,
            pages,
            logs: logs.map(log_entity_1.LogEntity.fromObject),
            next: page < pages ? `/api/logs?page=${page + 1}&limit=${limit}` : undefined,
            prev: page > 1 ? `/api/logs?page=${page - 1}&limit=${limit}` : undefined,
        };
    }
    async findById(id) {
        const log = await this.prisma.log.findUnique({ where: { id } });
        if (!log)
            throw custom_error_1.CustomError.notFound(`Log with id "${id}" not found`);
        return log_entity_1.LogEntity.fromObject(log);
    }
}
exports.LogPrismaDatasourceImpl = LogPrismaDatasourceImpl;
//# sourceMappingURL=log-prisma.datasource.impl.js.map