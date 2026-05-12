"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthPrismaDatasourceImpl = void 0;
const custom_error_1 = require("../../domain/entities/errors/custom.error");
const bcrypt_adapter_1 = require("../../config/adapters/bcrypt.adapter");
const jwt_adapter_1 = require("../../config/adapters/jwt.adapter");
const user_entity_1 = require("../../domain/entities/user.entity");
const role_type_1 = require("../../domain/types/role.type");
class AuthPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkAuth(token) {
        const payload = await jwt_adapter_1.JwtAdapter.validateToken(token);
        if (!payload) {
            throw custom_error_1.CustomError.unAuthorized('Invalid Bearer Token');
        }
        const user = await this.prisma.user.findUnique({ where: { id: payload.id } });
        if (!user) {
            throw custom_error_1.CustomError.unAuthorized('Invalid token - user');
        }
        return {
            user: user_entity_1.UserEntity.fromObject({ ...user, password: undefined }),
            token,
        };
    }
    async register(dto) {
        const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existingUser) {
            throw custom_error_1.CustomError.badRequest('Email already registered');
        }
        const hashedPassword = bcrypt_adapter_1.bcryptAdapter.hash(dto.password);
        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
                role: role_type_1.Role.USER,
                cart: {
                    create: {},
                },
            },
        });
        const token = await jwt_adapter_1.JwtAdapter.generateToken({
            id: user.id
        });
        if (!token) {
            throw custom_error_1.CustomError.internalServerError('Error generating token');
        }
        return {
            user: user_entity_1.UserEntity.fromObject({ ...user, password: undefined }),
            token,
        };
    }
    async login(dto) {
        console.log({ email: dto.email });
        console.log({ password: dto.password });
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user) {
            throw custom_error_1.CustomError.unAuthorized('Invalid credentials');
        }
        const isPasswordValid = bcrypt_adapter_1.bcryptAdapter.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw custom_error_1.CustomError.unAuthorized('Invalid credentials');
        }
        const token = await jwt_adapter_1.JwtAdapter.generateToken({
            id: user.id
        });
        if (!token) {
            throw custom_error_1.CustomError.internalServerError('Error generating token');
        }
        return {
            user: user_entity_1.UserEntity.fromObject({ ...user, password: undefined }),
            token,
        };
    }
}
exports.AuthPrismaDatasourceImpl = AuthPrismaDatasourceImpl;
//# sourceMappingURL=auth-prisma.datasource.impl.js.map