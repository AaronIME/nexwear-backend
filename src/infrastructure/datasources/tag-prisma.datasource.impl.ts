import { PrismaClient } from '../../../generated/prisma/client';
import { TagDatasource, TagPaginationResult } from '../../domain/datasources/tag.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateTagDto } from '../../domain/dtos/tag/create-tag.dto';
import { UpdateTagDto } from '../../domain/dtos/tag/update-tag.dto';
import { TagEntity } from '../../domain/entities/tag.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';

export class TagPrismaDatasourceImpl implements TagDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateTagDto): Promise<TagEntity> {
    const existing = await this.prisma.tag.findUnique({ where: { name: dto.name } });
    if (existing) throw CustomError.badRequest(`Tag with name "${dto.name}" already exists`);

    const tag = await this.prisma.tag.create({
      data: { name: dto.name },
    });

    return TagEntity.fromObject(tag);
  }

  async findAll(dto: PaginationDto): Promise<TagPaginationResult> {
    const { page, limit } = dto;
    const skip = (page - 1) * limit;

    const [total, tags] = await this.prisma.$transaction([
      this.prisma.tag.count(),
      this.prisma.tag.findMany({
        skip,
        take: limit,
        orderBy: { name: 'asc' },
      }),
    ]);

    const pages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      pages,
      next: page < pages ? `api/tags?page=${page + 1}&limit=${limit}` : undefined,
      prev: page > 1 ? `api/tags?page=${page - 1}&limit=${limit}` : undefined,
      tags: tags.map(TagEntity.fromObject),
    };
  }

  async findById(id: string): Promise<TagEntity> {
    const tag = await this.prisma.tag.findUnique({ where: { id } });
    if (!tag) throw CustomError.notFound(`Tag with id "${id}" not found`);

    return TagEntity.fromObject(tag);
  }

  async update(dto: UpdateTagDto): Promise<TagEntity> {
    await this.findById(dto.id);

    if (dto.name) {
      const existing = await this.prisma.tag.findUnique({ where: { name: dto.name } });
      if (existing && existing.id !== dto.id) {
        throw CustomError.badRequest(`Tag with name "${dto.name}" already exists`);
      }
    }

    const updated = await this.prisma.tag.update({
      where: { id: dto.id },
      data: { ...(dto.name && { name: dto.name }) },
    });

    return TagEntity.fromObject(updated);
  }

  async delete(id: string): Promise<TagEntity> {
    await this.findById(id);

    const deleted = await this.prisma.tag.delete({ where: { id } });

    return TagEntity.fromObject(deleted);
  }
}
