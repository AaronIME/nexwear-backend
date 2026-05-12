import { CustomError } from './errors/custom.error';

export class CartEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}

  static fromObject(object: { [key: string]: any }): CartEntity {
    const { id, _id, userId } = object;

    if (!id && !_id) throw CustomError.badRequest('Cart id is missing');
    if (!userId) throw CustomError.badRequest('Cart userId is missing');

    return new CartEntity(id ?? _id, userId);
  }
}
