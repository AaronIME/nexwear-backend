import { TagDatasource, TagPaginationResult } from '../../domain/datasources/tag.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateTagDto } from '../../domain/dtos/tag/create-tag.dto';
import { UpdateTagDto } from '../../domain/dtos/tag/update-tag.dto';
import { TagEntity } from '../../domain/entities/tag.entity';
import { TagRepository } from '../../domain/repositories/tag.repository';

export class TagRepositoryImpl implements TagRepository {
  constructor(private readonly datasource: TagDatasource) {}

  create(dto: CreateTagDto): Promise<TagEntity> {
    return this.datasource.create(dto);
  }

  findAll(dto: PaginationDto): Promise<TagPaginationResult> {
    return this.datasource.findAll(dto);
  }

  findById(id: string): Promise<TagEntity> {
    return this.datasource.findById(id);
  }

  update(dto: UpdateTagDto): Promise<TagEntity> {
    return this.datasource.update(dto);
  }

  delete(id: string): Promise<TagEntity> {
    return this.datasource.delete(id);
  }
}
