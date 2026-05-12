"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartPrismaDatasourceImpl = void 0;
const cart_entity_1 = require("../../domain/entities/cart.entity");
const cart_item_entity_1 = require("../../domain/entities/cart-item.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
const user_cart_entity_1 = require("../../domain/entities/user-cart.entity");
class CartPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.cart.findUnique({
            where: { userId: dto.userId },
        });
        if (existing)
            throw custom_error_1.CustomError.badRequest(`Cart for user "${dto.userId}" already exists`);
        const userExists = await this.prisma.user.findUnique({
            where: { id: dto.userId },
        });
        if (!userExists)
            throw custom_error_1.CustomError.notFound(`User with id "${dto.userId}" not found`);
        const cart = await this.prisma.cart.create({
            data: { userId: dto.userId },
        });
        return cart_entity_1.CartEntity.fromObject(cart);
    }
    async findById(id) {
        const cart = await this.prisma.cart.findUnique({ where: { id } });
        if (!cart)
            throw custom_error_1.CustomError.notFound(`Cart with id "${id}" not found`);
        return cart_entity_1.CartEntity.fromObject(cart);
    }
    async findByUserId(userId) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        productVariant: {
                            include: {
                                product: { select: { name: true } },
                                images: true,
                                size: { select: { name: true } },
                                color: { select: { name: true } },
                            },
                        },
                    },
                },
            },
        });
        if (!cart)
            throw custom_error_1.CustomError.notFound(`Cart for user "${userId}" not found`);
        const items = cart.items.map((item) => {
            const pv = item.productVariant;
            const { product, images = [], color, size, ...pvRest } = pv;
            const sorted = [...images].sort((a, b) => a.order - b.order);
            const firstImage = sorted[0];
            return cart_item_entity_1.CartItemEntity.fromObject({
                id: item.id,
                cartId: item.cartId,
                productVariantId: item.productVariantId,
                quantity: item.quantity,
                productName: product.name,
                productVariant: {
                    ...pvRest,
                    image: firstImage?.url,
                    color,
                    size,
                },
            });
        });
        return new user_cart_entity_1.UserCartEntity(cart.id, cart.userId, items);
    }
    async getItems(cartId) {
        await this.findById(cartId);
        const items = await this.prisma.cartItem.findMany({
            where: { cartId },
            orderBy: { id: "asc" },
            include: { productVariant: true },
        });
        return items.map(cart_item_entity_1.CartItemEntity.fromObject);
    }
    async clear(cartId) {
        await this.findById(cartId);
        await this.prisma.cartItem.deleteMany({ where: { cartId } });
    }
    async delete(id) {
        await this.findById(id);
        const deleted = await this.prisma.cart.delete({ where: { id } });
        return cart_entity_1.CartEntity.fromObject(deleted);
    }
}
exports.CartPrismaDatasourceImpl = CartPrismaDatasourceImpl;
//# sourceMappingURL=cart-prisma.datasource.impl.js.map