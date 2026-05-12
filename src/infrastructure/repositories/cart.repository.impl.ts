import { CartDatasource } from '../../domain/datasources/cart.datasource';
import { CreateCartDto } from '../../domain/dtos/cart/create-cart.dto';
import { CartEntity } from '../../domain/entities/cart.entity';
import { CartItemEntity } from '../../domain/entities/cart-item.entity';
import { CartRepository } from '../../domain/repositories/cart.repository';
import { UserCartEntity } from '../../domain/entities/user-cart.entity';

export class CartRepositoryImpl implements CartRepository {
  constructor(private readonly datasource: CartDatasource) {}

  create(dto: CreateCartDto): Promise<CartEntity> {
    return this.datasource.create(dto);
  }

  findById(id: string): Promise<CartEntity> {
    return this.datasource.findById(id);
  }

  findByUserId(userId: string): Promise<UserCartEntity> {
    return this.datasource.findByUserId(userId);
  }

  getItems(cartId: string): Promise<CartItemEntity[]> {
    return this.datasource.getItems(cartId);
  }

  clear(cartId: string): Promise<void> {
    return this.datasource.clear(cartId);
  }

  delete(id: string): Promise<CartEntity> {
    return this.datasource.delete(id);
  }
}
