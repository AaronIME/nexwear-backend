import { LogDatasource, LogPaginationResult } from '../../domain/datasources/log.datasource';
import { CreateLogDto } from '../../domain/dtos/log/create-log.dto';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { LogEntity } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repositories/log.repository';

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly datasource: LogDatasource) {}

  create(dto: CreateLogDto): Promise<LogEntity> {
    return this.datasource.create(dto);
  }

  findAll(dto: PaginationDto): Promise<LogPaginationResult> {
    return this.datasource.findAll(dto);
  }

  findById(id: string): Promise<LogEntity> {
    return this.datasource.findById(id);
  }
}
