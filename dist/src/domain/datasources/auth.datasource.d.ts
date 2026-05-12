import { LoginDto } from '../dtos/auth/login.dto';
import { RegisterDto } from '../dtos/auth/register.dto';
import { UserEntity } from '../entities/user.entity';
export interface LoginResult {
    token: string;
    user: UserEntity;
}
export interface CheckAuthResult {
    token: string;
    user: UserEntity;
}
export interface RegisterResult {
    token: string;
    user: UserEntity;
}
export declare abstract class AuthDatasource {
    abstract login(dto: LoginDto): Promise<LoginResult>;
    abstract register(dto: RegisterDto): Promise<RegisterResult>;
    abstract checkAuth(token: string): Promise<CheckAuthResult>;
}
//# sourceMappingURL=auth.datasource.d.ts.map