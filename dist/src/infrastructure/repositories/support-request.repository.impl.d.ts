import { SupportRequestDatasource, SupportRequestPaginationResult } from '../../domain/datasources/support-request.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateSupportRequestDto } from '../../domain/dtos/support-request/create-support-request.dto';
import { UpdateSupportRequestDto } from '../../domain/dtos/support-request/update-support-request.dto';
import { SupportRequestEntity } from '../../domain/entities/support-request.entity';
import { SupportRequestRepository } from '../../domain/repositories/support-request.repository';
export declare class SupportRequestRepositoryImpl implements SupportRequestRepository {
    private readonly datasource;
    constructor(datasource: SupportRequestDatasource);
    create(dto: CreateSupportRequestDto): Promise<SupportRequestEntity>;
    findAll(dto: PaginationDto): Promise<SupportRequestPaginationResult>;
    findById(id: string): Promise<SupportRequestEntity>;
    findByUserId(userId: string, dto: PaginationDto): Promise<SupportRequestPaginationResult>;
    updateStatus(dto: UpdateSupportRequestDto): Promise<SupportRequestEntity>;
    delete(id: string): Promise<SupportRequestEntity>;
}
//# sourceMappingURL=support-request.repository.impl.d.ts.map