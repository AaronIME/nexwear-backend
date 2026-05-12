import { SizeDatasource, SizePaginationResult } from '../../domain/datasources/size.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateSizeDto } from '../../domain/dtos/size/create-size.dto';
import { UpdateSizeDto } from '../../domain/dtos/size/update-size.dto';
import { SizeEntity } from '../../domain/entities/size.entity';
import { SizeRepository } from '../../domain/repositories/size.repository';

export class SizeRepositoryImpl implements SizeRepository {
  constructor(private readonly datasource: SizeDatasource) {}

  create(dto: CreateSizeDto): Promise<SizeEntity> {
    return this.datasource.create(dto);
  }

  findAll(dto: PaginationDto): Promise<SizePaginationResult> {
    return this.datasource.findAll(dto);
  }

  findById(id: string): Promise<SizeEntity> {
    return this.datasource.findById(id);
  }

  update(dto: UpdateSizeDto): Promise<SizeEntity> {
    return this.datasource.update(dto);
  }

  delete(id: string): Promise<SizeEntity> {
    return this.datasource.delete(id);
  }
}
