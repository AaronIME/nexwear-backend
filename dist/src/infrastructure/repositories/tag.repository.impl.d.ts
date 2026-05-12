import { TagDatasource, TagPaginationResult } from '../../domain/datasources/tag.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateTagDto } from '../../domain/dtos/tag/create-tag.dto';
import { UpdateTagDto } from '../../domain/dtos/tag/update-tag.dto';
import { TagEntity } from '../../domain/entities/tag.entity';
import { TagRepository } from '../../domain/repositories/tag.repository';
export declare class TagRepositoryImpl implements TagRepository {
    private readonly datasource;
    constructor(datasource: TagDatasource);
    create(dto: CreateTagDto): Promise<TagEntity>;
    findAll(dto: PaginationDto): Promise<TagPaginationResult>;
    findById(id: string): Promise<TagEntity>;
    update(dto: UpdateTagDto): Promise<TagEntity>;
    delete(id: string): Promise<TagEntity>;
}
//# sourceMappingURL=tag.repository.impl.d.ts.map