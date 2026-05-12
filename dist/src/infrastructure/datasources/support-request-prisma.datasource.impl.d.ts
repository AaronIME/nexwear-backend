import { PrismaClient } from '../../../generated/prisma/client';
import { SupportRequestDatasource, SupportRequestPaginationResult } from '../../domain/datasources/support-request.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateSupportRequestDto } from '../../domain/dtos/support-request/create-support-request.dto';
import { UpdateSupportRequestDto } from '../../domain/dtos/support-request/update-support-request.dto';
import { SupportRequestEntity } from '../../domain/entities/support-request.entity';
export declare class SupportRequestPrismaDatasourceImpl implements SupportRequestDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreateSupportRequestDto): Promise<SupportRequestEntity>;
    findAll(dto: PaginationDto): Promise<SupportRequestPaginationResult>;
    findById(id: string): Promise<SupportRequestEntity>;
    findByUserId(userId: string, dto: PaginationDto): Promise<SupportRequestPaginationResult>;
    updateStatus(dto: UpdateSupportRequestDto): Promise<SupportRequestEntity>;
    delete(id: string): Promise<SupportRequestEntity>;
}
//# sourceMappingURL=support-request-prisma.datasource.impl.d.ts.map