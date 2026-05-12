import { PrismaClient } from '../../../generated/prisma/client';
import { DiscountDatasource, DiscountPaginationResult } from '../../domain/datasources/discount.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateDiscountDto } from '../../domain/dtos/discount/create-discount.dto';
import { UpdateDiscountDto } from '../../domain/dtos/discount/update-discount.dto';
import { DiscountEntity } from '../../domain/entities/discount.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';

export class DiscountPrismaDatasourceImpl implements DiscountDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateDiscountDto): Promise<DiscountEntity> {
    const existing = await this.prisma.discount.findUnique({ where: { name: dto.name } });
    if (existing) throw CustomError.badRequest(`Discount with name "${dto.name}" already exists`);

    const discount = await this.prisma.discount.create({
      data: {
        name: dto.name,
        percentage: dto.percentage,
        startDate: dto.startDate,
        endDate: dto.endDate,
      },
    });

    return DiscountEntity.fromObject(discount);
  }

  async findAll(dto: PaginationDto): Promise<DiscountPaginationResult> {
    const { page, limit } = dto;
    const skip = (page - 1) * limit;

    const [total, discounts] = await this.prisma.$transaction([
      this.prisma.discount.count(),
      this.prisma.discount.findMany({
        skip,
        take: limit,
        orderBy: { startDate: 'desc' },
      }),
    ]);

    const pages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      pages,
      next: page < pages ? `api/discounts?page=${page + 1}&limit=${limit}` : undefined,
      prev: page > 1 ? `api/discounts?page=${page - 1}&limit=${limit}` : undefined,
      discounts: discounts.map(DiscountEntity.fromObject),
    };
  }

  async findById(id: string): Promise<DiscountEntity> {
    const discount = await this.prisma.discount.findUnique({ where: { id } });
    if (!discount) throw CustomError.notFound(`Discount with id "${id}" not found`);

    return DiscountEntity.fromObject(discount);
  }

  async update(dto: UpdateDiscountDto): Promise<DiscountEntity> {
    await this.findById(dto.id);

    if (dto.name) {
      const existing = await this.prisma.discount.findUnique({ where: { name: dto.name } });
      if (existing && existing.id !== dto.id) {
        throw CustomError.badRequest(`Discount with name "${dto.name}" already exists`);
      }
    }

    const updated = await this.prisma.discount.update({
      where: { id: dto.id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.percentage !== undefined && { percentage: dto.percentage }),
        ...(dto.startDate && { startDate: dto.startDate }),
        ...(dto.endDate && { endDate: dto.endDate }),
      },
    });

    return DiscountEntity.fromObject(updated);
  }

  async delete(id: string): Promise<DiscountEntity> {
    await this.findById(id);

    const deleted = await this.prisma.discount.delete({ where: { id } });

    return DiscountEntity.fromObject(deleted);
  }
}
