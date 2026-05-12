import { DiscountDatasource, DiscountPaginationResult } from '../../domain/datasources/discount.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateDiscountDto } from '../../domain/dtos/discount/create-discount.dto';
import { UpdateDiscountDto } from '../../domain/dtos/discount/update-discount.dto';
import { DiscountEntity } from '../../domain/entities/discount.entity';
import { DiscountRepository } from '../../domain/repositories/discount.repository';

export class DiscountRepositoryImpl implements DiscountRepository {
  constructor(private readonly datasource: DiscountDatasource) {}

  create(dto: CreateDiscountDto): Promise<DiscountEntity> {
    return this.datasource.create(dto);
  }

  findAll(dto: PaginationDto): Promise<DiscountPaginationResult> {
    return this.datasource.findAll(dto);
  }

  findById(id: string): Promise<DiscountEntity> {
    return this.datasource.findById(id);
  }

  update(dto: UpdateDiscountDto): Promise<DiscountEntity> {
    return this.datasource.update(dto);
  }

  delete(id: string): Promise<DiscountEntity> {
    return this.datasource.delete(id);
  }
}
