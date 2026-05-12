import { CartItemDatasource } from '../../domain/datasources/cart-item.datasource';
import { AddCartItemDto } from '../../domain/dtos/cart/add-cart-item.dto';
import { UpdateCartItemDto } from '../../domain/dtos/cart/update-cart-item.dto';
import { CartItemEntity } from '../../domain/entities/cart-item.entity';
import { CartItemRepository } from '../../domain/repositories/cart-item.repository';

export class CartItemRepositoryImpl implements CartItemRepository {
  constructor(private readonly datasource: CartItemDatasource) {}

  addItem(dto: AddCartItemDto): Promise<CartItemEntity> {
    return this.datasource.addItem(dto);
  }

  findById(id: string): Promise<CartItemEntity> {
    return this.datasource.findById(id);
  }

  findByCartId(cartId: string): Promise<CartItemEntity[]> {
    return this.datasource.findByCartId(cartId);
  }

  updateQuantity(dto: UpdateCartItemDto): Promise<CartItemEntity> {
    return this.datasource.updateQuantity(dto);
  }

  removeItem(id: string): Promise<CartItemEntity> {
    return this.datasource.removeItem(id);
  }
}
