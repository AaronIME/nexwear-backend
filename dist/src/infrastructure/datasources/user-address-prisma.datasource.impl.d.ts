import { PrismaClient } from '../../../generated/prisma/client';
import { UserAddressDatasource } from '../../domain/datasources/user-address.datasource';
import { CreateUserAddressDto } from '../../domain/dtos/user-address/create-user-address.dto';
import { UpdateUserAddressDto } from '../../domain/dtos/user-address/update-user-address.dto';
import { UserAddressEntity } from '../../domain/entities/user-address.entity';
export declare class UserAddressPrismaDatasourceImpl implements UserAddressDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreateUserAddressDto): Promise<UserAddressEntity>;
    findById(id: string): Promise<UserAddressEntity>;
    findByUserId(userId: string): Promise<UserAddressEntity[]>;
    setDefault(id: string, userId: string): Promise<UserAddressEntity>;
    update(dto: UpdateUserAddressDto): Promise<UserAddressEntity>;
    delete(id: string): Promise<UserAddressEntity>;
    private clearDefault;
}
//# sourceMappingURL=user-address-prisma.datasource.impl.d.ts.map