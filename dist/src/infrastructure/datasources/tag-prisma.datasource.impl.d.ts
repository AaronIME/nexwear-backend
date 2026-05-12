import { PrismaClient } from '../../../generated/prisma/client';
import { TagDatasource, TagPaginationResult } from '../../domain/datasources/tag.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateTagDto } from '../../domain/dtos/tag/create-tag.dto';
import { UpdateTagDto } from '../../domain/dtos/tag/update-tag.dto';
import { TagEntity } from '../../domain/entities/tag.entity';
export declare class TagPrismaDatasourceImpl implements TagDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreateTagDto): Promise<TagEntity>;
    findAll(dto: PaginationDto): Promise<TagPaginationResult>;
    findById(id: string): Promise<TagEntity>;
    update(dto: UpdateTagDto): Promise<TagEntity>;
    delete(id: string): Promise<TagEntity>;
}
//# sourceMappingURL=tag-prisma.datasource.impl.d.ts.map