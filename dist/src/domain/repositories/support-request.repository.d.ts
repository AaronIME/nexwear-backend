import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateSupportRequestDto } from '../dtos/support-request/create-support-request.dto';
import { UpdateSupportRequestDto } from '../dtos/support-request/update-support-request.dto';
import { SupportRequestEntity } from '../entities/support-request.entity';
import { SupportRequestPaginationResult } from '../datasources/support-request.datasource';
export declare abstract class SupportRequestRepository {
    abstract create(dto: CreateSupportRequestDto): Promise<SupportRequestEntity>;
    abstract findAll(dto: PaginationDto): Promise<SupportRequestPaginationResult>;
    abstract findById(id: string): Promise<SupportRequestEntity>;
    abstract findByUserId(userId: string, dto: PaginationDto): Promise<SupportRequestPaginationResult>;
    abstract updateStatus(dto: UpdateSupportRequestDto): Promise<SupportRequestEntity>;
    abstract delete(id: string): Promise<SupportRequestEntity>;
}
//# sourceMappingURL=support-request.repository.d.ts.map