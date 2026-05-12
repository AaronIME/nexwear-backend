import { UserAddressDatasource } from '../../domain/datasources/user-address.datasource';
import { CreateUserAddressDto } from '../../domain/dtos/user-address/create-user-address.dto';
import { UpdateUserAddressDto } from '../../domain/dtos/user-address/update-user-address.dto';
import { UserAddressEntity } from '../../domain/entities/user-address.entity';
import { UserAddressRepository } from '../../domain/repositories/user-address.repository';
export declare class UserAddressRepositoryImpl implements UserAddressRepository {
    private readonly datasource;
    constructor(datasource: UserAddressDatasource);
    create(dto: CreateUserAddressDto): Promise<UserAddressEntity>;
    findById(id: string): Promise<UserAddressEntity>;
    findByUserId(userId: string): Promise<UserAddressEntity[]>;
    setDefault(id: string, userId: string): Promise<UserAddressEntity>;
    update(dto: UpdateUserAddressDto): Promise<UserAddressEntity>;
    delete(id: string): Promise<UserAddressEntity>;
}
//# sourceMappingURL=user-address.repository.impl.d.ts.map