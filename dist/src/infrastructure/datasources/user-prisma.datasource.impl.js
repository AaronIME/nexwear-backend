"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrismaDatasourceImpl = void 0;
const user_entity_1 = require("../../domain/entities/user.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
const bcrypt_adapter_1 = require("../../config/adapters/bcrypt.adapter");
class UserPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing)
            throw custom_error_1.CustomError.badRequest(`Email "${dto.email}" is already registered`);
        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: bcrypt_adapter_1.bcryptAdapter.hash(dto.password),
                role: dto.role,
                cart: {
                    create: {},
                },
            },
        });
        return user_entity_1.UserEntity.fromObject(user);
    }
    async findAll(dto) {
        const { page, limit } = dto;
        const skip = (page - 1) * limit;
        const [total, users] = await this.prisma.$transaction([
            this.prisma.user.count(),
            this.prisma.user.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
        ]);
        const pages = Math.ceil(total / limit);
        return {
            page,
            limit,
            total,
            pages,
            next: page < pages ? `api/users?page=${page + 1}&limit=${limit}` : undefined,
            prev: page > 1 ? `api/users?page=${page - 1}&limit=${limit}` : undefined,
            users: users.map(user_entity_1.UserEntity.fromObject),
        };
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw custom_error_1.CustomError.notFound(`User with id "${id}" not found`);
        return user_entity_1.UserEntity.fromObject(user);
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            throw custom_error_1.CustomError.notFound(`User with email "${email}" not found`);
        return user_entity_1.UserEntity.fromObject(user);
    }
    async update(dto) {
        await this.findById(dto.id);
        if (dto.email) {
            const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
            if (existing && existing.id !== dto.id) {
                throw custom_error_1.CustomError.badRequest(`Email "${dto.email}" is already registered`);
            }
        }
        const updated = await this.prisma.user.update({
            where: { id: dto.id },
            data: {
                ...(dto.name && { name: dto.name }),
                ...(dto.role && { role: dto.role }),
                ...(dto.email && { email: dto.email }),
                ...(dto.password && { password: bcrypt_adapter_1.bcryptAdapter.hash(dto.password) }),
            },
        });
        return user_entity_1.UserEntity.fromObject(updated);
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.user.delete({ where: { id } });
        return user_entity_1.UserEntity.fromObject(deleted);
    }
}
exports.UserPrismaDatasourceImpl = UserPrismaDatasourceImpl;
//# sourceMappingURL=user-prisma.datasource.impl.js.map