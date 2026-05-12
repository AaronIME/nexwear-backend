import { PrismaClient } from '../../../generated/prisma/client';
import { LogDatasource, LogPaginationResult } from '../../domain/datasources/log.datasource';
import { CreateLogDto } from '../../domain/dtos/log/create-log.dto';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { LogEntity } from '../../domain/entities/log.entity';
export declare class LogPrismaDatasourceImpl implements LogDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreateLogDto): Promise<LogEntity>;
    findAll(dto: PaginationDto): Promise<LogPaginationResult>;
    findById(id: string): Promise<LogEntity>;
}
//# sourceMappingURL=log-prisma.datasource.impl.d.ts.map