import { PrismaClient } from '../../../generated/prisma/client';
import { BrandDatasource, BrandPaginationResult } from '../../domain/datasources/brand.datasource';
import { CreateBrandDto } from '../../domain/dtos/brand/create-brand.dto';
import { UpdateBrandDto } from '../../domain/dtos/brand/update-brand.dto';
import { BrandEntity } from '../../domain/entities/brand.entity';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
export declare class BrandPrismaDatasourceImpl implements BrandDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreateBrandDto): Promise<BrandEntity>;
    findAll(dto: PaginationDto): Promise<BrandPaginationResult>;
    findById(id: string): Promise<BrandEntity>;
    update(dto: UpdateBrandDto): Promise<BrandEntity>;
    delete(id: string): Promise<BrandEntity>;
}
//# sourceMappingURL=brand-prisma.datasource.impl.d.ts.map