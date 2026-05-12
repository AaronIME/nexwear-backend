import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateTagDto } from '../dtos/tag/create-tag.dto';
import { UpdateTagDto } from '../dtos/tag/update-tag.dto';
import { TagEntity } from '../entities/tag.entity';
import { TagPaginationResult } from '../datasources/tag.datasource';

export abstract class TagRepository {
  abstract create(dto: CreateTagDto): Promise<TagEntity>;
  abstract findAll(dto: PaginationDto): Promise<TagPaginationResult>;
  abstract findById(id: string): Promise<TagEntity>;
  abstract update(dto: UpdateTagDto): Promise<TagEntity>;
  abstract delete(id: string): Promise<TagEntity>;
}
