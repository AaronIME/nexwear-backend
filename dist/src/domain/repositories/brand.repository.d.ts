import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateBrandDto } from '../dtos/brand/create-brand.dto';
import { UpdateBrandDto } from '../dtos/brand/update-brand.dto';
import { BrandEntity } from '../entities/brand.entity';
import { BrandPaginationResult } from '../datasources/brand.datasource';
export declare abstract class BrandRepository {
    abstract create(dto: CreateBrandDto): Promise<BrandEntity>;
    abstract findAll(dto: PaginationDto): Promise<BrandPaginationResult>;
    abstract findById(id: string): Promise<BrandEntity>;
    abstract update(dto: UpdateBrandDto): Promise<BrandEntity>;
    abstract delete(id: string): Promise<BrandEntity>;
}
//# sourceMappingURL=brand.repository.d.ts.map