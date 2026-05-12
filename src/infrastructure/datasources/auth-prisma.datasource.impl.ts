import { PrismaClient } from '../../../generated/prisma/client';
import { AuthDatasource, LoginResult, CheckAuthResult, RegisterResult } from '../../domain/datasources/auth.datasource';
import { LoginDto } from '../../domain/dtos/auth/login.dto';
import { RegisterDto } from '../../domain/dtos/auth/register.dto';
import { CustomError } from '../../domain/entities/errors/custom.error';
import { bcryptAdapter } from '../../config/adapters/bcrypt.adapter';
import { JwtAdapter } from '../../config/adapters/jwt.adapter';
import { UserEntity } from '../../domain/entities/user.entity';
import { Role } from '../../domain/types/role.type';

export class AuthPrismaDatasourceImpl implements AuthDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async checkAuth(token: string): Promise<CheckAuthResult> {
    const payload = await JwtAdapter.validateToken<{ id: string }>(token);

    if (!payload) {
      throw CustomError.unAuthorized('Invalid Bearer Token');
    }

    const user = await this.prisma.user.findUnique({ where: { id: payload.id } });

    if (!user) {
      throw CustomError.unAuthorized('Invalid token - user');
    }

    return {
      user: UserEntity.fromObject({...user, password: undefined}),
      token,
    };
  }

  async register(dto: RegisterDto): Promise<RegisterResult> {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (existingUser) {
      throw CustomError.badRequest('Email already registered');
    }

    const hashedPassword = bcryptAdapter.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: Role.USER,
        cart: {
          create: {},
        },
      },
    });

    const token = await JwtAdapter.generateToken({
      id: user.id
    });

    if (!token) {
      throw CustomError.internalServerError('Error generating token');
    }

    return {
      user: UserEntity.fromObject({...user, password: undefined}),
      token,
    };
  }

  async login(dto: LoginDto): Promise<LoginResult> {

    console.log({email: dto.email});
    console.log({password: dto.password});
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (!user) {
      throw CustomError.unAuthorized('Invalid credentials');
    }

    const isPasswordValid = bcryptAdapter.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw CustomError.unAuthorized('Invalid credentials');
    }

    const token = await JwtAdapter.generateToken({
      id: user.id
    });

    if (!token) {
      throw CustomError.internalServerError('Error generating token');
    }

    return {
      user: UserEntity.fromObject({...user, password: undefined}),
      token,
    };
  }
}
