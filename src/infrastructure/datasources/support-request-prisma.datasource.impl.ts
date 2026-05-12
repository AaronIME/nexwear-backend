import { PrismaClient } from '../../../generated/prisma/client';
import {
  SupportRequestDatasource,
  SupportRequestPaginationResult,
} from '../../domain/datasources/support-request.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateSupportRequestDto } from '../../domain/dtos/support-request/create-support-request.dto';
import { UpdateSupportRequestDto } from '../../domain/dtos/support-request/update-support-request.dto';
import { SupportRequestEntity } from '../../domain/entities/support-request.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';
import { SupportStatus } from '../../domain/types/support-status.type';

const CLOSEABLE_STATUSES: SupportStatus[] = [SupportStatus.RESOLVED];

export class SupportRequestPrismaDatasourceImpl implements SupportRequestDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateSupportRequestDto): Promise<SupportRequestEntity> {
    const userExists = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!userExists) throw CustomError.notFound(`User with id "${dto.userId}" not found`);

    const supportRequest = await this.prisma.supportRequest.create({
      data: {
        userId: dto.userId,
        subject: dto.subject,
        message: dto.message,
        status: SupportStatus.OPEN,
      },
    });

    return SupportRequestEntity.fromObject(supportRequest);
  }

  async findAll(dto: PaginationDto): Promise<SupportRequestPaginationResult> {
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
      supportRequests: supportRequests.map(SupportRequestEntity.fromObject),
    };
  }

  async findById(id: string): Promise<SupportRequestEntity> {
    const supportRequest = await this.prisma.supportRequest.findUnique({ where: { id } });
    if (!supportRequest) throw CustomError.notFound(`Support request with id "${id}" not found`);

    return SupportRequestEntity.fromObject(supportRequest);
  }

  async findByUserId(userId: string, dto: PaginationDto): Promise<SupportRequestPaginationResult> {
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
      supportRequests: supportRequests.map(SupportRequestEntity.fromObject),
    };
  }

  async updateStatus(dto: UpdateSupportRequestDto): Promise<SupportRequestEntity> {
    const supportRequest = await this.findById(dto.id);

    if (supportRequest.status === SupportStatus.CLOSED) {
      throw CustomError.badRequest('Cannot update the status of a closed support request');
    }

    if (dto.status === SupportStatus.OPEN && !CLOSEABLE_STATUSES.includes(supportRequest.status)) {
      throw CustomError.badRequest('A support request can only be reopened from RESOLVED status');
    }

    const updated = await this.prisma.supportRequest.update({
      where: { id: dto.id },
      data: { status: dto.status },
    });

    return SupportRequestEntity.fromObject(updated);
  }

  async delete(id: string): Promise<SupportRequestEntity> {
    await this.findById(id);

    const deleted = await this.prisma.supportRequest.delete({ where: { id } });

    return SupportRequestEntity.fromObject(deleted);
  }
}
