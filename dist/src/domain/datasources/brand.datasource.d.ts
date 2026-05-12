import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateBrandDto } from '../dtos/brand/create-brand.dto';
import { UpdateBrandDto } from '../dtos/brand/update-brand.dto';
import { BrandEntity } from '../entities/brand.entity';
export interface BrandPaginationResult {
    page: number;
    limit: number;
    total: number;
    pages: number;
    next?: string | undefined;
    prev?: string | undefined;
    brands: BrandEntity[];
}
export declare abstract class BrandDatasource {
    abstract create(dto: CreateBrandDto): Promise<BrandEntity>;
    abstract findAll(dto: PaginationDto): Promise<BrandPaginationResult>;
    abstract findById(id: string): Promise<BrandEntity>;
    abstract update(dto: UpdateBrandDto): Promise<BrandEntity>;
    abstract delete(id: string): Promise<BrandEntity>;
}
//# sourceMappingURL=brand.datasource.d.ts.map