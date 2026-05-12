import { PrismaClient } from '../../../generated/prisma/client';
import { CategoryDatasource, CategoryPaginationResult } from '../../domain/datasources/category.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { UpdateCategoryDto } from '../../domain/dtos/category/update-category.dto';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';

export class CategoryPrismaDatasourceImpl implements CategoryDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const existing = await this.prisma.category.findUnique({ where: { name: dto.name } });
    if (existing) throw CustomError.badRequest(`Category with name "${dto.name}" already exists`);

    const category = await this.prisma.category.create({
      data: {
        name: dto.name,
      },
    });

    return CategoryEntity.fromObject(category);
  }

  async findAll(dto: PaginationDto): Promise<CategoryPaginationResult> {
    const { page, limit } = dto;
    const skip = (page - 1) * limit;

    const [total, categories] = await this.prisma.$transaction([
      this.prisma.category.count(),
      this.prisma.category.findMany({
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
      next: page < pages ? `api/categories?page=${page + 1}&limit=${limit}` : undefined,
      prev: page > 1 ? `api/categories?page=${page - 1}&limit=${limit}` : undefined,
      categories: categories.map(CategoryEntity.fromObject),
    };
  }

  async findById(id: string): Promise<CategoryEntity> {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw CustomError.notFound(`Category with id "${id}" not found`);

    return CategoryEntity.fromObject(category);
  }

  async update(dto: UpdateCategoryDto): Promise<CategoryEntity> {
    await this.findById(dto.id);

    if (dto.name) {
      const existing = await this.prisma.category.findUnique({ where: { name: dto.name } });
      if (existing && existing.id !== dto.id) {
        throw CustomError.badRequest(`Category with name "${dto.name}" already exists`);
      }
    }

    const updated = await this.prisma.category.update({
      where: { id: dto.id },
      data: {
        ...(dto.name && { name: dto.name }),
      },
    });

    return CategoryEntity.fromObject(updated);
  }

  async delete(id: string): Promise<CategoryEntity> {
    await this.findById(id);

    const deleted = await this.prisma.category.delete({ where: { id } });

    return CategoryEntity.fromObject(deleted);
  }
}
