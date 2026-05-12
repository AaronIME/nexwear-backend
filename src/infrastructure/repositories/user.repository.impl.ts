import { UserDatasource, UserPaginationResult } from '../../domain/datasources/user.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateUserDto } from '../../domain/dtos/user/create-user.dto';
import { UpdateUserDto } from '../../domain/dtos/user/update-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDatasource) {}

  create(dto: CreateUserDto): Promise<UserEntity> {
    return this.datasource.create(dto);
  }

  findAll(dto: PaginationDto): Promise<UserPaginationResult> {
    return this.datasource.findAll(dto);
  }

  findById(id: string): Promise<UserEntity> {
    return this.datasource.findById(id);
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.datasource.findByEmail(email);
  }

  update(dto: UpdateUserDto): Promise<UserEntity> {
    return this.datasource.update(dto);
  }

  delete(id: string): Promise<UserEntity> {
    return this.datasource.delete(id);
  }
}
