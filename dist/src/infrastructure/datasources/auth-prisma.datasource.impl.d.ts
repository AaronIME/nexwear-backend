import { PrismaClient } from '../../../generated/prisma/client';
import { AuthDatasource, LoginResult, CheckAuthResult, RegisterResult } from '../../domain/datasources/auth.datasource';
import { LoginDto } from '../../domain/dtos/auth/login.dto';
import { RegisterDto } from '../../domain/dtos/auth/register.dto';
export declare class AuthPrismaDatasourceImpl implements AuthDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    checkAuth(token: string): Promise<CheckAuthResult>;
    register(dto: RegisterDto): Promise<RegisterResult>;
    login(dto: LoginDto): Promise<LoginResult>;
}
//# sourceMappingURL=auth-prisma.datasource.impl.d.ts.map