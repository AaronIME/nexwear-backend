import { PrismaClient } from '../../../generated/prisma/client';
import { SizeDatasource, SizePaginationResult } from '../../domain/datasources/size.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateSizeDto } from '../../domain/dtos/size/create-size.dto';
import { UpdateSizeDto } from '../../domain/dtos/size/update-size.dto';
import { SizeEntity } from '../../domain/entities/size.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';

export class SizePrismaDatasourceImpl implements SizeDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateSizeDto): Promise<SizeEntity> {
    const existing = await this.prisma.size.findUnique({ where: { name: dto.name } });
    if (existing) throw CustomError.badRequest(`Size with name "${dto.name}" already exists`);

    const size = await this.prisma.size.create({
      data: { name: dto.name },
    });

    return SizeEntity.fromObject(size);
  }

  async findAll(dto: PaginationDto): Promise<SizePaginationResult> {
    const { page, limit } = dto;
    const skip = (page - 1) * limit;

    const [total, sizes] = await this.prisma.$transaction([
      this.prisma.size.count(),
      this.prisma.size.findMany({
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
      next: page < pages ? `api/sizes?page=${page + 1}&limit=${limit}` : undefined,
      prev: page > 1 ? `api/sizes?page=${page - 1}&limit=${limit}` : undefined,
      sizes: sizes.map(SizeEntity.fromObject),
    };
  }

  async findById(id: string): Promise<SizeEntity> {
    const size = await this.prisma.size.findUnique({ where: { id } });
    if (!size) throw CustomError.notFound(`Size with id "${id}" not found`);

    return SizeEntity.fromObject(size);
  }

  async update(dto: UpdateSizeDto): Promise<SizeEntity> {
    await this.findById(dto.id);

    if (dto.name) {
      const existing = await this.prisma.size.findUnique({ where: { name: dto.name } });
      if (existing && existing.id !== dto.id) {
        throw CustomError.badRequest(`Size with name "${dto.name}" already exists`);
      }
    }

    const updated = await this.prisma.size.update({
      where: { id: dto.id },
      data: { ...(dto.name && { name: dto.name }) },
    });

    return SizeEntity.fromObject(updated);
  }

  async delete(id: string): Promise<SizeEntity> {
    await this.findById(id);

    const deleted = await this.prisma.size.delete({ where: { id } });

    return SizeEntity.fromObject(deleted);
  }
}
