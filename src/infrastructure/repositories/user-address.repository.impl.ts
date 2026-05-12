import { UserAddressDatasource } from '../../domain/datasources/user-address.datasource';
import { CreateUserAddressDto } from '../../domain/dtos/user-address/create-user-address.dto';
import { UpdateUserAddressDto } from '../../domain/dtos/user-address/update-user-address.dto';
import { UserAddressEntity } from '../../domain/entities/user-address.entity';
import { UserAddressRepository } from '../../domain/repositories/user-address.repository';

export class UserAddressRepositoryImpl implements UserAddressRepository {
  constructor(private readonly datasource: UserAddressDatasource) {}

  create(dto: CreateUserAddressDto): Promise<UserAddressEntity> {
    return this.datasource.create(dto);
  }

  findById(id: string): Promise<UserAddressEntity> {
    return this.datasource.findById(id);
  }

  findByUserId(userId: string): Promise<UserAddressEntity[]> {
    return this.datasource.findByUserId(userId);
  }

  setDefault(id: string, userId: string): Promise<UserAddressEntity> {
    return this.datasource.setDefault(id, userId);
  }

  update(dto: UpdateUserAddressDto): Promise<UserAddressEntity> {
    return this.datasource.update(dto);
  }

  delete(id: string): Promise<UserAddressEntity> {
    return this.datasource.delete(id);
  }
}
