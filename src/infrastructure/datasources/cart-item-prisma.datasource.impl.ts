import { PrismaClient } from '../../../generated/prisma/client';
import { CartItemDatasource } from '../../domain/datasources/cart-item.datasource';
import { AddCartItemDto } from '../../domain/dtos/cart/add-cart-item.dto';
import { UpdateCartItemDto } from '../../domain/dtos/cart/update-cart-item.dto';
import { CartItemEntity } from '../../domain/entities/cart-item.entity';
import { CustomError } from '../../domain/entities/errors/custom.error';

export class CartItemPrismaDatasourceImpl implements CartItemDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async addItem(dto: AddCartItemDto): Promise<CartItemEntity> {
    const cartExists = await this.prisma.cart.findUnique({ where: { id: dto.cartId } });
    if (!cartExists) throw CustomError.notFound(`Cart with id "${dto.cartId}" not found`);

    const variantExists = await this.prisma.productVariant.findUnique({
      where: { id: dto.productVariantId },
    });
    if (!variantExists) {
      throw CustomError.notFound(`Product variant with id "${dto.productVariantId}" not found`);
    }

    if (variantExists.stock < dto.quantity) {
      throw CustomError.badRequest(
        `Not enough stock. Available: ${variantExists.stock}, requested: ${dto.quantity}`,
      );
    }

    const existing = await this.prisma.cartItem.findFirst({
      where: { cartId: dto.cartId, productVariantId: dto.productVariantId },
    });

    if (existing) {
      const newQuantity = existing.quantity + dto.quantity;

      if (variantExists.stock < newQuantity) {
        throw CustomError.badRequest(
          `Not enough stock. Available: ${variantExists.stock}, requested: ${newQuantity}`,
        );
      }

      const updated = await this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: newQuantity },
      });

      return CartItemEntity.fromObject(updated);
    }

    const item = await this.prisma.cartItem.create({
      data: {
        cartId: dto.cartId,
        productVariantId: dto.productVariantId,
        quantity: dto.quantity,
      },
    });

    return CartItemEntity.fromObject(item);
  }

  async findById(id: string): Promise<CartItemEntity> {
    const item = await this.prisma.cartItem.findUnique({ where: { id } });
    if (!item) throw CustomError.notFound(`Cart item with id "${id}" not found`);

    return CartItemEntity.fromObject(item);
  }

  async findByCartId(cartId: string): Promise<CartItemEntity[]> {
    const items = await this.prisma.cartItem.findMany({
      where: { cartId },
      orderBy: { id: 'asc' },
    });

    return items.map(CartItemEntity.fromObject);
  }

  async updateQuantity(dto: UpdateCartItemDto): Promise<CartItemEntity> {
    const item = await this.findById(dto.id);

    const variant = await this.prisma.productVariant.findUnique({
      where: { id: item.productVariantId },
    });

    if (variant && variant.stock < dto.quantity) {
      throw CustomError.badRequest(
        `Not enough stock. Available: ${variant.stock}, requested: ${dto.quantity}`,
      );
    }

    const updated = await this.prisma.cartItem.update({
      where: { id: dto.id },
      data: { quantity: dto.quantity },
    });

    return CartItemEntity.fromObject(updated);
  }

  async removeItem(id: string): Promise<CartItemEntity> {
    await this.findById(id);

    const deleted = await this.prisma.cartItem.delete({ where: { id } });

    return CartItemEntity.fromObject(deleted);
  }
}
