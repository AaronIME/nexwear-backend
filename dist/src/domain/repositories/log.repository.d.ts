import { CreateLogDto } from '../dtos/log/create-log.dto';
import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { LogEntity } from '../entities/log.entity';
import { LogPaginationResult } from '../datasources/log.datasource';
export declare abstract class LogRepository {
    abstract create(dto: CreateLogDto): Promise<LogEntity>;
    abstract findAll(dto: PaginationDto): Promise<LogPaginationResult>;
    abstract findById(id: string): Promise<LogEntity>;
}
//# sourceMappingURL=log.repository.d.ts.map