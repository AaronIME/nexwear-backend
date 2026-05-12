import { PrismaClient } from '../../../generated/prisma/client';
import { ColorDatasource, ColorPaginationResult } from '../../domain/datasources/color.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateColorDto } from '../../domain/dtos/color/create-color.dto';
import { UpdateColorDto } from '../../domain/dtos/color/update-color.dto';
import { ColorEntity } from '../../domain/entities/color.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';

export class ColorPrismaDatasourceImpl implements ColorDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateColorDto): Promise<ColorEntity> {
    const existing = await this.prisma.color.findUnique({ where: { name: dto.name } });
    if (existing) throw CustomError.badRequest(`Color with name "${dto.name}" already exists`);

    const color = await this.prisma.color.create({
      data: { name: dto.name, hex: dto.hex },
    });

    return ColorEntity.fromObject(color);
  }

  async findAll(dto: PaginationDto): Promise<ColorPaginationResult> {
    const { page, limit } = dto;
    const skip = (page - 1) * limit;

    const [total, colors] = await this.prisma.$transaction([
      this.prisma.color.count(),
      this.prisma.color.findMany({
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
      next: page < pages ? `api/colors?page=${page + 1}&limit=${limit}` : undefined,
      prev: page > 1 ? `api/colors?page=${page - 1}&limit=${limit}` : undefined,
      colors: colors.map(ColorEntity.fromObject),
    };
  }

  async findById(id: string): Promise<ColorEntity> {
    const color = await this.prisma.color.findUnique({ where: { id } });
    if (!color) throw CustomError.notFound(`Color with id "${id}" not found`);

    return ColorEntity.fromObject(color);
  }

  async update(dto: UpdateColorDto): Promise<ColorEntity> {
    await this.findById(dto.id);

    if (dto.name) {
      const existing = await this.prisma.color.findUnique({ where: { name: dto.name } });
      if (existing && existing.id !== dto.id) {
        throw CustomError.badRequest(`Color with name "${dto.name}" already exists`);
      }
    }

    const updated = await this.prisma.color.update({
      where: { id: dto.id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.hex && { hex: dto.hex }),
      },
    });

    return ColorEntity.fromObject(updated);
  }

  async delete(id: string): Promise<ColorEntity> {
    await this.findById(id);

    const deleted = await this.prisma.color.delete({ where: { id } });

    return ColorEntity.fromObject(deleted);
  }
}
