import { PrismaClient } from "../../../generated/prisma/client";
import { CartDatasource } from "../../domain/datasources/cart.datasource";
import { CreateCartDto } from "../../domain/dtos/cart/create-cart.dto";
import { CartEntity } from "../../domain/entities/cart.entity";
import { CartItemEntity } from "../../domain/entities/cart-item.entity";
import { UserCartEntity } from "../../domain/entities/user-cart.entity";
export declare class CartPrismaDatasourceImpl implements CartDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreateCartDto): Promise<CartEntity>;
    findById(id: string): Promise<CartEntity>;
    findByUserId(userId: string): Promise<UserCartEntity>;
    getItems(cartId: string): Promise<CartItemEntity[]>;
    clear(cartId: string): Promise<void>;
    delete(id: string): Promise<CartEntity>;
}
//# sourceMappingURL=cart-prisma.datasource.impl.d.ts.map