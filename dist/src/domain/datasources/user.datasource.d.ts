import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { UserEntity } from '../entities/user.entity';
export interface UserPaginationResult {
    page: number;
    limit: number;
    total: number;
    pages: number;
    next?: string | undefined;
    prev?: string | undefined;
    users: UserEntity[];
}
export declare abstract class UserDatasource {
    abstract create(dto: CreateUserDto): Promise<UserEntity>;
    abstract findAll(dto: PaginationDto): Promise<UserPaginationResult>;
    abstract findById(id: string): Promise<UserEntity>;
    abstract findByEmail(email: string): Promise<UserEntity>;
    abstract update(dto: UpdateUserDto): Promise<UserEntity>;
    abstract delete(id: string): Promise<UserEntity>;
}
//# sourceMappingURL=user.datasource.d.ts.map