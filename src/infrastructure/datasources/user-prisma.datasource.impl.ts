import { PrismaClient } from '../../../generated/prisma/client';
import { UserDatasource, UserPaginationResult } from '../../domain/datasources/user.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateUserDto } from '../../domain/dtos/user/create-user.dto';
import { UpdateUserDto } from '../../domain/dtos/user/update-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';
import { bcryptAdapter } from '../../config/adapters/bcrypt.adapter';

export class UserPrismaDatasourceImpl implements UserDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw CustomError.badRequest(`Email "${dto.email}" is already registered`);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: bcryptAdapter.hash(dto.password),
        role: dto.role,
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        ...(dto.isDeleted !== undefined && { isDeleted: dto.isDeleted }),
        cart: {
          create: {},
        },
      },
    });

    return UserEntity.fromObject(user);
  }

  async findAll(dto: PaginationDto): Promise<UserPaginationResult> {
    const { page, limit } = dto;
    const skip = (page - 1) * limit;

    const [total, users] = await this.prisma.$transaction([
      this.prisma.user.count(),
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const pages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      pages,
      next: page < pages ? `api/users?page=${page + 1}&limit=${limit}` : undefined,
      prev: page > 1 ? `api/users?page=${page - 1}&limit=${limit}` : undefined,
      users: users.map(UserEntity.fromObject),
    };
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw CustomError.notFound(`User with id "${id}" not found`);

    return UserEntity.fromObject(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw CustomError.notFound(`User with email "${email}" not found`);

    return UserEntity.fromObject(user);
  }

  async update(dto: UpdateUserDto): Promise<UserEntity> {
    await this.findById(dto.id);

    if (dto.email) {
      const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
      if (existing && existing.id !== dto.id) {
        throw CustomError.badRequest(`Email "${dto.email}" is already registered`);
      }
    }

    const updated = await this.prisma.user.update({
      where: { id: dto.id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.role && { role: dto.role }),
        ...(dto.email && { email: dto.email }),
        ...(dto.password && { password: bcryptAdapter.hash(dto.password) }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        ...(dto.isDeleted !== undefined && { isDeleted: dto.isDeleted }),
      },
    });

    return UserEntity.fromObject(updated);
  }

  async delete(id: string): Promise<UserEntity> {
    await this.findById(id);

    const deleted = await this.prisma.user.delete({ where: { id } });

    return UserEntity.fromObject(deleted);
  }
}
