import { PrismaClient } from '../../../generated/prisma/client';
import { UserAddressDatasource } from '../../domain/datasources/user-address.datasource';
import { CreateUserAddressDto } from '../../domain/dtos/user-address/create-user-address.dto';
import { UpdateUserAddressDto } from '../../domain/dtos/user-address/update-user-address.dto';
import { UserAddressEntity } from '../../domain/entities/user-address.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';

export class UserAddressPrismaDatasourceImpl implements UserAddressDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateUserAddressDto): Promise<UserAddressEntity> {
    const userExists = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!userExists) throw CustomError.notFound(`User with id "${dto.userId}" not found`);

    if (dto.isDefault) {
      await this.clearDefault(dto.userId);
    }

    const address = await this.prisma.userAddress.create({
      data: {
        userId: dto.userId,
        street: dto.street,
        city: dto.city,
        state: dto.state,
        country: dto.country,
        postalCode: dto.postalCode,
        isDefault: dto.isDefault,
      },
    });

    return UserAddressEntity.fromObject(address);
  }

  async findById(id: string): Promise<UserAddressEntity> {
    const address = await this.prisma.userAddress.findUnique({ where: { id } });
    if (!address) throw CustomError.notFound(`Address with id "${id}" not found`);

    return UserAddressEntity.fromObject(address);
  }

  async findByUserId(userId: string): Promise<UserAddressEntity[]> {
    const addresses = await this.prisma.userAddress.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { id: 'asc' }],
    });

    return addresses.map(UserAddressEntity.fromObject);
  }

  async setDefault(id: string, userId: string): Promise<UserAddressEntity> {
    const address = await this.findById(id);
    if (address.userId !== userId) {
      throw CustomError.forbidden('Address does not belong to this user');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.userAddress.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });

      await tx.userAddress.update({
        where: { id },
        data: { isDefault: true },
      });
    });

    return this.findById(id);
  }

  async update(dto: UpdateUserAddressDto): Promise<UserAddressEntity> {
    const address = await this.findById(dto.id);

    if (dto.isDefault === true && !address.isDefault) {
      await this.clearDefault(address.userId);
    }

    const updated = await this.prisma.userAddress.update({
      where: { id: dto.id },
      data: {
        ...(dto.street && { street: dto.street }),
        ...(dto.city && { city: dto.city }),
        ...(dto.state && { state: dto.state }),
        ...(dto.country && { country: dto.country }),
        ...(dto.postalCode && { postalCode: dto.postalCode }),
        ...(dto.isDefault !== undefined && { isDefault: dto.isDefault }),
      },
    });

    return UserAddressEntity.fromObject(updated);
  }

  async delete(id: string): Promise<UserAddressEntity> {
    await this.findById(id);

    const deleted = await this.prisma.userAddress.delete({ where: { id } });

    return UserAddressEntity.fromObject(deleted);
  }

  private async clearDefault(userId: string): Promise<void> {
    await this.prisma.userAddress.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }
}
