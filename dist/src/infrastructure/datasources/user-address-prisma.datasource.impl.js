"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddressPrismaDatasourceImpl = void 0;
const user_address_entity_1 = require("../../domain/entities/user-address.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
class UserAddressPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const userExists = await this.prisma.user.findUnique({ where: { id: dto.userId } });
        if (!userExists)
            throw custom_error_1.CustomError.notFound(`User with id "${dto.userId}" not found`);
        if (dto.isDefault) {
            await this.clearDefault(dto.userId);
        }
        const address = await this.prisma.userAddress.create({
            data: {
                userId: dto.userId,
                street: dto.street,
                city: dto.city,
                state: dto.state,
                country: dto.country,
                postalCode: dto.postalCode,
                isDefault: dto.isDefault,
            },
        });
        return user_address_entity_1.UserAddressEntity.fromObject(address);
    }
    async findById(id) {
        const address = await this.prisma.userAddress.findUnique({ where: { id } });
        if (!address)
            throw custom_error_1.CustomError.notFound(`Address with id "${id}" not found`);
        return user_address_entity_1.UserAddressEntity.fromObject(address);
    }
    async findByUserId(userId) {
        const addresses = await this.prisma.userAddress.findMany({
            where: { userId },
            orderBy: [{ isDefault: 'desc' }, { id: 'asc' }],
        });
        return addresses.map(user_address_entity_1.UserAddressEntity.fromObject);
    }
    async setDefault(id, userId) {
        await this.findById(id);
        await this.prisma.$transaction(async (tx) => {
            await tx.userAddress.updateMany({
                where: { userId, isDefault: true },
                data: { isDefault: false },
            });
            await tx.userAddress.update({
                where: { id },
                data: { isDefault: true },
            });
        });
        return this.findById(id);
    }
    async update(dto) {
        const address = await this.findById(dto.id);
        if (dto.isDefault === true && !address.isDefault) {
            await this.clearDefault(address.userId);
        }
        const updated = await this.prisma.userAddress.update({
            where: { id: dto.id },
            data: {
                ...(dto.street && { street: dto.street }),
                ...(dto.city && { city: dto.city }),
                ...(dto.state && { state: dto.state }),
                ...(dto.country && { country: dto.country }),
                ...(dto.postalCode && { postalCode: dto.postalCode }),
                ...(dto.isDefault !== undefined && { isDefault: dto.isDefault }),
            },
        });
        return user_address_entity_1.UserAddressEntity.fromObject(updated);
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.userAddress.delete({ where: { id } });
        return user_address_entity_1.UserAddressEntity.fromObject(deleted);
    }
    async clearDefault(userId) {
        await this.prisma.userAddress.updateMany({
            where: { userId, isDefault: true },
            data: { isDefault: false },
        });
    }
}
exports.UserAddressPrismaDatasourceImpl = UserAddressPrismaDatasourceImpl;
//# sourceMappingURL=user-address-prisma.datasource.impl.js.map