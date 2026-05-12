import { PrismaClient } from '../../../generated/prisma/client';
import { LogDatasource, LogPaginationResult } from '../../domain/datasources/log.datasource';
import { CreateLogDto } from '../../domain/dtos/log/create-log.dto';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CustomError } from '../../domain/entities/errors/custom.error';
import { LogEntity } from '../../domain/entities/log.entity';

export class LogPrismaDatasourceImpl implements LogDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateLogDto): Promise<LogEntity> {
    const log = await this.prisma.log.create({
      data: {
        level: dto.level,
        message: dto.message,
        service: dto.service,
      },
    });

    return LogEntity.fromObject(log);
  }

  async findAll(dto: PaginationDto): Promise<LogPaginationResult> {
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
      logs: logs.map(LogEntity.fromObject),
      next: page < pages ? `/api/logs?page=${page + 1}&limit=${limit}` : undefined,
      prev: page > 1 ? `/api/logs?page=${page - 1}&limit=${limit}` : undefined,
    };
  }

  async findById(id: string): Promise<LogEntity> {
    const log = await this.prisma.log.findUnique({ where: { id } });
    if (!log) throw CustomError.notFound(`Log with id "${id}" not found`);

    return LogEntity.fromObject(log);
  }
}
