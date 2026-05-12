
import { CreateCartDto } from '../dtos/cart/create-cart.dto';
import { CartEntity } from '../entities/cart.entity';
import { CartItemEntity } from '../entities/cart-item.entity';
import { UserCartEntity } from '../entities/user-cart.entity';

export abstract class CartRepository {
  abstract create(dto: CreateCartDto): Promise<CartEntity>;
  abstract findById(id: string): Promise<CartEntity>;
  abstract findByUserId(userId: string): Promise<UserCartEntity>;
  abstract getItems(cartId: string): Promise<CartItemEntity[]>;
  abstract clear(cartId: string): Promise<void>;
  abstract delete(id: string): Promise<CartEntity>;
}
