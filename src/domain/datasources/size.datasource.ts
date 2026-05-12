import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateSizeDto } from '../dtos/size/create-size.dto';
import { UpdateSizeDto } from '../dtos/size/update-size.dto';
import { SizeEntity } from '../entities/size.entity';

export interface SizePaginationResult {
  page: number;
  limit: number;
  total: number;
  pages: number;
  next?: string | undefined;
  prev?: string | undefined;
  sizes: SizeEntity[];
}

export abstract class SizeDatasource {
  abstract create(dto: CreateSizeDto): Promise<SizeEntity>;
  abstract findAll(dto: PaginationDto): Promise<SizePaginationResult>;
  abstract findById(id: string): Promise<SizeEntity>;
  abstract update(dto: UpdateSizeDto): Promise<SizeEntity>;
  abstract delete(id: string): Promise<SizeEntity>;
}
