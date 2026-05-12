import { PrismaClient } from '../../../generated/prisma/client';
import { BrandDatasource, BrandPaginationResult } from '../../domain/datasources/brand.datasource';
import { CreateBrandDto } from '../../domain/dtos/brand/create-brand.dto';
import { UpdateBrandDto } from '../../domain/dtos/brand/update-brand.dto';
import { BrandEntity } from '../../domain/entities/brand.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';


export class BrandPrismaDatasourceImpl implements BrandDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateBrandDto): Promise<BrandEntity> {
    const existing = await this.prisma.brand.findUnique({ where: { name: dto.name } });
    if (existing) throw CustomError.badRequest(`Brand with name "${dto.name}" already exists`);

    const brand = await this.prisma.brand.create({
      data: { name: dto.name },
    });

    return BrandEntity.fromObject(brand);
  }

  async findAll(dto: PaginationDto): Promise<BrandPaginationResult> {
    const { page, limit } = dto;
    const skip = (page - 1) * limit;

    const [total, brands] = await this.prisma.$transaction([
      this.prisma.brand.count(),
      this.prisma.brand.findMany({
        skip,
        take: limit,
        orderBy: { name: 'asc' },
      }),
    ]);

    const pages = Math.ceil(total / limit);

    console.log({brands})

    return {
      page,
      limit,
      total,
      pages,
      next: page < pages ? `api/brands?page=${page + 1}&limit=${limit}` : undefined,
      prev: page > 1 ? `api/brands?page=${page - 1}&limit=${limit}` : undefined,
      brands: brands.map(BrandEntity.fromObject),
    };
  }

  async findById(id: string): Promise<BrandEntity> {
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) throw CustomError.notFound(`Brand with id "${id}" not found`);

    return BrandEntity.fromObject(brand);
  }

  async update(dto: UpdateBrandDto): Promise<BrandEntity> {
    await this.findById(dto.id);

    if (dto.name) {
      const existing = await this.prisma.brand.findUnique({ where: { name: dto.name } });
      if (existing && existing.id !== dto.id) {
        throw CustomError.badRequest(`Brand with name "${dto.name}" already exists`);
      }
    }

    const updated = await this.prisma.brand.update({
      where: { id: dto.id },
      data: { ...(dto.name && { name: dto.name }) },
    });

    return BrandEntity.fromObject(updated);
  }

  async delete(id: string): Promise<BrandEntity> {
    await this.findById(id);

    const deleted = await this.prisma.brand.delete({ where: { id } });

    return BrandEntity.fromObject(deleted);
  }
}
