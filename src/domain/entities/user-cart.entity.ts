import { CartItemEntity } from './cart-item.entity';
import { CustomError } from './errors/custom.error';

export class UserCartEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly items: CartItemEntity[],
  ) {}

  static fromObject(object: { [key: string]: any }): UserCartEntity {
    const { id, _id, userId, items } = object;

    if (!id && !_id) throw CustomError.badRequest('Cart id is missing');
    if (!userId) throw CustomError.badRequest('Cart userId is missing');

    return new UserCartEntity(id ?? _id, userId, [...items.map((item: { [key: string]: any }) => CartItemEntity.fromObject(item))]);
  }
}
