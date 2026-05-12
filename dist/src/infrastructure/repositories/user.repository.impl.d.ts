import { UserDatasource, UserPaginationResult } from '../../domain/datasources/user.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateUserDto } from '../../domain/dtos/user/create-user.dto';
import { UpdateUserDto } from '../../domain/dtos/user/update-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
export declare class UserRepositoryImpl implements UserRepository {
    private readonly datasource;
    constructor(datasource: UserDatasource);
    create(dto: CreateUserDto): Promise<UserEntity>;
    findAll(dto: PaginationDto): Promise<UserPaginationResult>;
    findById(id: string): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    update(dto: UpdateUserDto): Promise<UserEntity>;
    delete(id: string): Promise<UserEntity>;
}
//# sourceMappingURL=user.repository.impl.d.ts.map