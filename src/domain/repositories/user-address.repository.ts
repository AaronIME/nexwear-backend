import { CreateUserAddressDto } from '../dtos/user-address/create-user-address.dto';
import { UpdateUserAddressDto } from '../dtos/user-address/update-user-address.dto';
import { UserAddressEntity } from '../entities/user-address.entity';

export abstract class UserAddressRepository {
  abstract create(dto: CreateUserAddressDto): Promise<UserAddressEntity>;
  abstract findById(id: string): Promise<UserAddressEntity>;
  abstract findByUserId(userId: string): Promise<UserAddressEntity[]>;
  abstract setDefault(id: string, userId: string): Promise<UserAddressEntity>;
  abstract update(dto: UpdateUserAddressDto): Promise<UserAddressEntity>;
  abstract delete(id: string): Promise<UserAddressEntity>;
}
