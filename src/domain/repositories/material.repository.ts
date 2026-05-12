import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateMaterialDto } from '../dtos/material/create-material.dto';
import { UpdateMaterialDto } from '../dtos/material/update-material.dto';
import { MaterialEntity } from '../entities/material.entity';
import { MaterialPaginationResult } from '../datasources/material.datasource';

export abstract class MaterialRepository {
  abstract create(dto: CreateMaterialDto): Promise<MaterialEntity>;
  abstract findAll(dto: PaginationDto): Promise<MaterialPaginationResult>;
  abstract findById(id: string): Promise<MaterialEntity>;
  abstract update(dto: UpdateMaterialDto): Promise<MaterialEntity>;
  abstract delete(id: string): Promise<MaterialEntity>;
}
