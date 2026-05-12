import { BrandDatasource, BrandPaginationResult } from '../../domain/datasources/brand.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateBrandDto } from '../../domain/dtos/brand/create-brand.dto';
import { UpdateBrandDto } from '../../domain/dtos/brand/update-brand.dto';
import { BrandEntity } from '../../domain/entities/brand.entity';
import { BrandRepository } from '../../domain/repositories/brand.repository';

export class BrandRepositoryImpl implements BrandRepository {
  constructor(private readonly datasource: BrandDatasource) {}

  create(dto: CreateBrandDto): Promise<BrandEntity> {
    return this.datasource.create(dto);
  }

  findAll(dto: PaginationDto): Promise<BrandPaginationResult> {
    return this.datasource.findAll(dto);
  }

  findById(id: string): Promise<BrandEntity> {
    return this.datasource.findById(id);
  }

  update(dto: UpdateBrandDto): Promise<BrandEntity> {
    return this.datasource.update(dto);
  }

  delete(id: string): Promise<BrandEntity> {
    return this.datasource.delete(id);
  }
}
