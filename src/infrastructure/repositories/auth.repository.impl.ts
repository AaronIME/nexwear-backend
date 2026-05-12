import { AuthDatasource, LoginResult, CheckAuthResult, RegisterResult } from '../../domain/datasources/auth.datasource';
import { LoginDto } from '../../domain/dtos/auth/login.dto';
import { RegisterDto } from '../../domain/dtos/auth/register.dto';
import { AuthRepository } from '../../domain/repositories/auth.repository';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly datasource: AuthDatasource) {}

  login(dto: LoginDto): Promise<LoginResult> {
    return this.datasource.login(dto);
  }

  register(dto: RegisterDto): Promise<RegisterResult> {
    return this.datasource.register(dto);
  }

  checkAuth(token: string): Promise<CheckAuthResult> {
    return this.datasource.checkAuth(token);
  }
}
