import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateSizeDto } from '../dtos/size/create-size.dto';
import { UpdateSizeDto } from '../dtos/size/update-size.dto';
import { SizeEntity } from '../entities/size.entity';
import { SizePaginationResult } from '../datasources/size.datasource';

export abstract class SizeRepository {
  abstract create(dto: CreateSizeDto): Promise<SizeEntity>;
  abstract findAll(dto: PaginationDto): Promise<SizePaginationResult>;
  abstract findById(id: string): Promise<SizeEntity>;
  abstract update(dto: UpdateSizeDto): Promise<SizeEntity>;
  abstract delete(id: string): Promise<SizeEntity>;
}
