import { CartItemDatasource } from '../../domain/datasources/cart-item.datasource';
import { AddCartItemDto } from '../../domain/dtos/cart/add-cart-item.dto';
import { UpdateCartItemDto } from '../../domain/dtos/cart/update-cart-item.dto';
import { CartItemEntity } from '../../domain/entities/cart-item.entity';
import { CartItemRepository } from '../../domain/repositories/cart-item.repository';
export declare class CartItemRepositoryImpl implements CartItemRepository {
    private readonly datasource;
    constructor(datasource: CartItemDatasource);
    addItem(dto: AddCartItemDto): Promise<CartItemEntity>;
    findById(id: string): Promise<CartItemEntity>;
    findByCartId(cartId: string): Promise<CartItemEntity[]>;
    updateQuantity(dto: UpdateCartItemDto): Promise<CartItemEntity>;
    removeItem(id: string): Promise<CartItemEntity>;
}
//# sourceMappingURL=cart-item.repository.impl.d.ts.map