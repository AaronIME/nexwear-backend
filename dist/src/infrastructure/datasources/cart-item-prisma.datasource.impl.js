"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemPrismaDatasourceImpl = void 0;
const cart_item_entity_1 = require("../../domain/entities/cart-item.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
class CartItemPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addItem(dto) {
        const cartExists = await this.prisma.cart.findUnique({ where: { id: dto.cartId } });
        if (!cartExists)
            throw custom_error_1.CustomError.notFound(`Cart with id "${dto.cartId}" not found`);
        const variantExists = await this.prisma.productVariant.findUnique({
            where: { id: dto.productVariantId },
        });
        if (!variantExists) {
            throw custom_error_1.CustomError.notFound(`Product variant with id "${dto.productVariantId}" not found`);
        }
        if (variantExists.stock < dto.quantity) {
            throw custom_error_1.CustomError.badRequest(`Not enough stock. Available: ${variantExists.stock}, requested: ${dto.quantity}`);
        }
        const existing = await this.prisma.cartItem.findFirst({
            where: { cartId: dto.cartId, productVariantId: dto.productVariantId },
        });
        if (existing) {
            const newQuantity = existing.quantity + dto.quantity;
            if (variantExists.stock < newQuantity) {
                throw custom_error_1.CustomError.badRequest(`Not enough stock. Available: ${variantExists.stock}, requested: ${newQuantity}`);
            }
            const updated = await this.prisma.cartItem.update({
                where: { id: existing.id },
                data: { quantity: newQuantity },
            });
            return cart_item_entity_1.CartItemEntity.fromObject(updated);
        }
        const item = await this.prisma.cartItem.create({
            data: {
                cartId: dto.cartId,
                productVariantId: dto.productVariantId,
                quantity: dto.quantity,
            },
        });
        return cart_item_entity_1.CartItemEntity.fromObject(item);
    }
    async findById(id) {
        const item = await this.prisma.cartItem.findUnique({ where: { id } });
        if (!item)
            throw custom_error_1.CustomError.notFound(`Cart item with id "${id}" not found`);
        return cart_item_entity_1.CartItemEntity.fromObject(item);
    }
    async findByCartId(cartId) {
        const items = await this.prisma.cartItem.findMany({
            where: { cartId },
            orderBy: { id: 'asc' },
        });
        return items.map(cart_item_entity_1.CartItemEntity.fromObject);
    }
    async updateQuantity(dto) {
        const item = await this.findById(dto.id);
        const variant = await this.prisma.productVariant.findUnique({
            where: { id: item.productVariantId },
        });
        if (variant && variant.stock < dto.quantity) {
            throw custom_error_1.CustomError.badRequest(`Not enough stock. Available: ${variant.stock}, requested: ${dto.quantity}`);
        }
        const updated = await this.prisma.cartItem.update({
            where: { id: dto.id },
            data: { quantity: dto.quantity },
        });
        return cart_item_entity_1.CartItemEntity.fromObject(updated);
    }
    async removeItem(id) {
        await this.findById(id);
        const deleted = await this.prisma.cartItem.delete({ where: { id } });
        return cart_item_entity_1.CartItemEntity.fromObject(deleted);
    }
}
exports.CartItemPrismaDatasourceImpl = CartItemPrismaDatasourceImpl;
//# sourceMappingURL=cart-item-prisma.datasource.impl.js.map