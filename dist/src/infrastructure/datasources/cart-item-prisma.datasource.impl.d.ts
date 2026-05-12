import { PrismaClient } from '../../../generated/prisma/client';
import { CartItemDatasource } from '../../domain/datasources/cart-item.datasource';
import { AddCartItemDto } from '../../domain/dtos/cart/add-cart-item.dto';
import { UpdateCartItemDto } from '../../domain/dtos/cart/update-cart-item.dto';
import { CartItemEntity } from '../../domain/entities/cart-item.entity';
export declare class CartItemPrismaDatasourceImpl implements CartItemDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    addItem(dto: AddCartItemDto): Promise<CartItemEntity>;
    findById(id: string): Promise<CartItemEntity>;
    findByCartId(cartId: string): Promise<CartItemEntity[]>;
    updateQuantity(dto: UpdateCartItemDto): Promise<CartItemEntity>;
    removeItem(id: string): Promise<CartItemEntity>;
}
//# sourceMappingURL=cart-item-prisma.datasource.impl.d.ts.map