import { PrismaClient } from '../../../generated/prisma/client';
import { UserDatasource, UserPaginationResult } from '../../domain/datasources/user.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateUserDto } from '../../domain/dtos/user/create-user.dto';
import { UpdateUserDto } from '../../domain/dtos/user/update-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
export declare class UserPrismaDatasourceImpl implements UserDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreateUserDto): Promise<UserEntity>;
    findAll(dto: PaginationDto): Promise<UserPaginationResult>;
    findById(id: string): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    update(dto: UpdateUserDto): Promise<UserEntity>;
    delete(id: string): Promise<UserEntity>;
}
//# sourceMappingURL=user-prisma.datasource.impl.d.ts.map