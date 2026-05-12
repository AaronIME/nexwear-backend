import { LoginResult, CheckAuthResult, RegisterResult } from '../datasources/auth.datasource';
import { LoginDto } from '../dtos/auth/login.dto';
import { RegisterDto } from '../dtos/auth/register.dto';

export abstract class AuthRepository {
  abstract login(dto: LoginDto): Promise<LoginResult>;
  abstract register(dto: RegisterDto): Promise<RegisterResult>;
  abstract checkAuth(token: string): Promise<CheckAuthResult>;
}
