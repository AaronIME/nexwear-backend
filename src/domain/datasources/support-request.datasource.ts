import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateSupportRequestDto } from '../dtos/support-request/create-support-request.dto';
import { UpdateSupportRequestDto } from '../dtos/support-request/update-support-request.dto';
import { SupportRequestEntity } from '../entities/support-request.entity';

export interface SupportRequestPaginationResult {
  page: number;
  limit: number;
  total: number;
  pages: number;
  next?: string | undefined;
  prev?: string | undefined;
  supportRequests: SupportRequestEntity[];
}

export abstract class SupportRequestDatasource {
  abstract create(dto: CreateSupportRequestDto): Promise<SupportRequestEntity>;
  abstract findAll(dto: PaginationDto): Promise<SupportRequestPaginationResult>;
  abstract findById(id: string): Promise<SupportRequestEntity>;
  abstract findByUserId(userId: string, dto: PaginationDto): Promise<SupportRequestPaginationResult>;
  abstract updateStatus(dto: UpdateSupportRequestDto): Promise<SupportRequestEntity>;
  abstract delete(id: string): Promise<SupportRequestEntity>;
}
