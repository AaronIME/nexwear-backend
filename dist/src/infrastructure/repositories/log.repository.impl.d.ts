import { LogDatasource, LogPaginationResult } from '../../domain/datasources/log.datasource';
import { CreateLogDto } from '../../domain/dtos/log/create-log.dto';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { LogEntity } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repositories/log.repository';
export declare class LogRepositoryImpl implements LogRepository {
    private readonly datasource;
    constructor(datasource: LogDatasource);
    create(dto: CreateLogDto): Promise<LogEntity>;
    findAll(dto: PaginationDto): Promise<LogPaginationResult>;
    findById(id: string): Promise<LogEntity>;
}
//# sourceMappingURL=log.repository.impl.d.ts.map