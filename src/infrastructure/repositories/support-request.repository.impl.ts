import { SupportRequestDatasource, SupportRequestPaginationResult } from '../../domain/datasources/support-request.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateSupportRequestDto } from '../../domain/dtos/support-request/create-support-request.dto';
import { UpdateSupportRequestDto } from '../../domain/dtos/support-request/update-support-request.dto';
import { SupportRequestEntity } from '../../domain/entities/support-request.entity';
import { SupportRequestRepository } from '../../domain/repositories/support-request.repository';

export class SupportRequestRepositoryImpl implements SupportRequestRepository {
  constructor(private readonly datasource: SupportRequestDatasource) {}

  create(dto: CreateSupportRequestDto): Promise<SupportRequestEntity> {
    return this.datasource.create(dto);
  }

  findAll(dto: PaginationDto): Promise<SupportRequestPaginationResult> {
    return this.datasource.findAll(dto);
  }

  findById(id: string): Promise<SupportRequestEntity> {
    return this.datasource.findById(id);
  }

  findByUserId(userId: string, dto: PaginationDto): Promise<SupportRequestPaginationResult> {
    return this.datasource.findByUserId(userId, dto);
  }

  updateStatus(dto: UpdateSupportRequestDto): Promise<SupportRequestEntity> {
    return this.datasource.updateStatus(dto);
  }

  delete(id: string): Promise<SupportRequestEntity> {
    return this.datasource.delete(id);
  }
}
