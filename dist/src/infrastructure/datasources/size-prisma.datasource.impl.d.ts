import { PrismaClient } from '../../../generated/prisma/client';
import { SizeDatasource, SizePaginationResult } from '../../domain/datasources/size.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateSizeDto } from '../../domain/dtos/size/create-size.dto';
import { UpdateSizeDto } from '../../domain/dtos/size/update-size.dto';
import { SizeEntity } from '../../domain/entities/size.entity';
export declare class SizePrismaDatasourceImpl implements SizeDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreateSizeDto): Promise<SizeEntity>;
    findAll(dto: PaginationDto): Promise<SizePaginationResult>;
    findById(id: string): Promise<SizeEntity>;
    update(dto: UpdateSizeDto): Promise<SizeEntity>;
    delete(id: string): Promise<SizeEntity>;
}
//# sourceMappingURL=size-prisma.datasource.impl.d.ts.map