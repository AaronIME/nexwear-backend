import { CreateLogDto } from '../dtos/log/create-log.dto';
import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { LogEntity } from '../entities/log.entity';
export interface LogPaginationResult {
    page: number;
    limit: number;
    total: number;
    pages: number;
    next?: string | undefined;
    prev?: string | undefined;
    logs: LogEntity[];
}
export declare abstract class LogDatasource {
    abstract create(dto: CreateLogDto): Promise<LogEntity>;
    abstract findAll(dto: PaginationDto): Promise<LogPaginationResult>;
    abstract findById(id: string): Promise<LogEntity>;
}
//# sourceMappingURL=log.datasource.d.ts.map