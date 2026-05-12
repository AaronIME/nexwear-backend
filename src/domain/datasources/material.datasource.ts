import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateMaterialDto } from '../dtos/material/create-material.dto';
import { UpdateMaterialDto } from '../dtos/material/update-material.dto';
import { MaterialEntity } from '../entities/material.entity';

export interface MaterialPaginationResult {
  page: number;
  limit: number;
  total: number;
  pages: number;
  next?: string | undefined;
  prev?: string | undefined;
  materials: MaterialEntity[];
}

export abstract class MaterialDatasource {
  abstract create(dto: CreateMaterialDto): Promise<MaterialEntity>;
  abstract findAll(dto: PaginationDto): Promise<MaterialPaginationResult>;
  abstract findById(id: string): Promise<MaterialEntity>;
  abstract update(dto: UpdateMaterialDto): Promise<MaterialEntity>;
  abstract delete(id: string): Promise<MaterialEntity>;
}
