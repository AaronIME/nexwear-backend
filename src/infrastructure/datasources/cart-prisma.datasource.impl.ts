import { PrismaClient } from "../../../generated/prisma/client";
import { CartDatasource } from "../../domain/datasources/cart.datasource";
import { CreateCartDto } from "../../domain/dtos/cart/create-cart.dto";
import { CartEntity } from "../../domain/entities/cart.entity";
import { CartItemEntity } from "../../domain/entities/cart-item.entity";
import { CustomError } from "../../domain/entities/errors/custom.error";
import { UserCartEntity } from "../../domain/entities/user-cart.entity";

export class CartPrismaDatasourceImpl implements CartDatasource {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateCartDto): Promise<CartEntity> {
    const existing = await this.prisma.cart.findUnique({
      where: { userId: dto.userId },
    });
    if (existing)
      throw CustomError.badRequest(
        `Cart for user "${dto.userId}" already exists`,
      );

    const userExists = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    if (!userExists)
      throw CustomError.notFound(`User with id "${dto.userId}" not found`);

    const cart = await this.prisma.cart.create({
      data: { userId: dto.userId },
    });

    return CartEntity.fromObject(cart);
  }

  async findById(id: string): Promise<CartEntity> {
    const cart = await this.prisma.cart.findUnique({ where: { id } });
    if (!cart) throw CustomError.notFound(`Cart with id "${id}" not found`);

    return CartEntity.fromObject(cart);
  }

  async findByUserId(userId: string): Promise<UserCartEntity> {
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
      throw CustomError.notFound(`Cart for user "${userId}" not found`);

    const items = cart.items.map((item) => {
      const pv = item.productVariant;
      const { product, images = [], color, size, ...pvRest } = pv;
      const sorted = [...images].sort((a, b) => a.order - b.order);
      const firstImage = sorted[0];

      return CartItemEntity.fromObject({
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

    return new UserCartEntity(cart.id, cart.userId, items);
  }

  async getItems(cartId: string): Promise<CartItemEntity[]> {
    await this.findById(cartId);

    const items = await this.prisma.cartItem.findMany({
      where: { cartId },
      orderBy: { id: "asc" },
      include: { productVariant: true },
    });

    return items.map(CartItemEntity.fromObject);
  }

  async clear(cartId: string): Promise<void> {
    await this.findById(cartId);

    await this.prisma.cartItem.deleteMany({ where: { cartId } });
  }

  async delete(id: string): Promise<CartEntity> {
    await this.findById(id);

    const deleted = await this.prisma.cart.delete({ where: { id } });

    return CartEntity.fromObject(deleted);
  }
}
