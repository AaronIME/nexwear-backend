import { MaterialDatasource, MaterialPaginationResult } from '../../domain/datasources/material.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateMaterialDto } from '../../domain/dtos/material/create-material.dto';
import { UpdateMaterialDto } from '../../domain/dtos/material/update-material.dto';
import { MaterialEntity } from '../../domain/entities/material.entity';
import { MaterialRepository } from '../../domain/repositories/material.repository';

export class MaterialRepositoryImpl implements MaterialRepository {
  constructor(private readonly datasource: MaterialDatasource) {}

  create(dto: CreateMaterialDto): Promise<MaterialEntity> {
    return this.datasource.create(dto);
  }

  findAll(dto: PaginationDto): Promise<MaterialPaginationResult> {
    return this.datasource.findAll(dto);
  }

  findById(id: string): Promise<MaterialEntity> {
    return this.datasource.findById(id);
  }

  update(dto: UpdateMaterialDto): Promise<MaterialEntity> {
    return this.datasource.update(dto);
  }

  delete(id: string): Promise<MaterialEntity> {
    return this.datasource.delete(id);
  }
}
