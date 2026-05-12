import { AddCartItemDto } from '../dtos/cart/add-cart-item.dto';
import { UpdateCartItemDto } from '../dtos/cart/update-cart-item.dto';
import { CartItemEntity } from '../entities/cart-item.entity';

export abstract class CartItemDatasource {
  abstract addItem(dto: AddCartItemDto): Promise<CartItemEntity>;
  abstract findById(id: string): Promise<CartItemEntity>;
  abstract findByCartId(cartId: string): Promise<CartItemEntity[]>;
  abstract updateQuantity(dto: UpdateCartItemDto): Promise<CartItemEntity>;
  abstract removeItem(id: string): Promise<CartItemEntity>;
}
