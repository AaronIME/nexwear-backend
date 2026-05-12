import { AuthDatasource, LoginResult, CheckAuthResult, RegisterResult } from '../../domain/datasources/auth.datasource';
import { LoginDto } from '../../domain/dtos/auth/login.dto';
import { RegisterDto } from '../../domain/dtos/auth/register.dto';
import { AuthRepository } from '../../domain/repositories/auth.repository';
export declare class AuthRepositoryImpl implements AuthRepository {
    private readonly datasource;
    constructor(datasource: AuthDatasource);
    login(dto: LoginDto): Promise<LoginResult>;
    register(dto: RegisterDto): Promise<RegisterResult>;
    checkAuth(token: string): Promise<CheckAuthResult>;
}
//# sourceMappingURL=auth.repository.impl.d.ts.map