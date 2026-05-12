import { BrandDatasource, BrandPaginationResult } from '../../domain/datasources/brand.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateBrandDto } from '../../domain/dtos/brand/create-brand.dto';
import { UpdateBrandDto } from '../../domain/dtos/brand/update-brand.dto';
import { BrandEntity } from '../../domain/entities/brand.entity';
import { BrandRepository } from '../../domain/repositories/brand.repository';
export declare class BrandRepositoryImpl implements BrandRepository {
    private readonly datasource;
    constructor(datasource: BrandDatasource);
    create(dto: CreateBrandDto): Promise<BrandEntity>;
    findAll(dto: PaginationDto): Promise<BrandPaginationResult>;
    findById(id: string): Promise<BrandEntity>;
    update(dto: UpdateBrandDto): Promise<BrandEntity>;
    delete(id: string): Promise<BrandEntity>;
}
//# sourceMappingURL=brand.repository.impl.d.ts.map