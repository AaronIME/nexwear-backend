import { PrismaClient } from '../../../generated/prisma/client';
import { MaterialDatasource, MaterialPaginationResult } from '../../domain/datasources/material.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateMaterialDto } from '../../domain/dtos/material/create-material.dto';
import { UpdateMaterialDto } from '../../domain/dtos/material/update-material.dto';
import { MaterialEntity } from '../../domain/entities/material.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';

export class MaterialPrismaDatasourceImpl implements MaterialDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateMaterialDto): Promise<MaterialEntity> {
    const existing = await this.prisma.material.findUnique({ where: { name: dto.name } });
    if (existing) throw CustomError.badRequest(`Material with name "${dto.name}" already exists`);

    const material = await this.prisma.material.create({
      data: { name: dto.name },
    });

    return MaterialEntity.fromObject(material);
  }

  async findAll(dto: PaginationDto): Promise<MaterialPaginationResult> {
    const { page, limit } = dto;
    const skip = (page - 1) * limit;

    const [total, materials] = await this.prisma.$transaction([
      this.prisma.material.count(),
      this.prisma.material.findMany({
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
      next: page < pages ? `api/materials?page=${page + 1}&limit=${limit}` : undefined,
      prev: page > 1 ? `api/materials?page=${page - 1}&limit=${limit}` : undefined,
      materials: materials.map(MaterialEntity.fromObject),
    };
  }

  async findById(id: string): Promise<MaterialEntity> {
    const material = await this.prisma.material.findUnique({ where: { id } });
    if (!material) throw CustomError.notFound(`Material with id "${id}" not found`);

    return MaterialEntity.fromObject(material);
  }

  async update(dto: UpdateMaterialDto): Promise<MaterialEntity> {
    await this.findById(dto.id);

    if (dto.name) {
      const existing = await this.prisma.material.findUnique({ where: { name: dto.name } });
      if (existing && existing.id !== dto.id) {
        throw CustomError.badRequest(`Material with name "${dto.name}" already exists`);
      }
    }

    const updated = await this.prisma.material.update({
      where: { id: dto.id },
      data: { ...(dto.name && { name: dto.name }) },
    });

    return MaterialEntity.fromObject(updated);
  }

  async delete(id: string): Promise<MaterialEntity> {
    await this.findById(id);

    const deleted = await this.prisma.material.delete({ where: { id } });

    return MaterialEntity.fromObject(deleted);
  }
}
