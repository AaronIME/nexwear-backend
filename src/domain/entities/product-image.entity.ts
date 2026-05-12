import { CustomError } from './errors/custom.error';

export class ProductImageEntity {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly url: string,
    public readonly order: number,
  ) {}

  static fromObject(object: { [key: string]: any }): ProductImageEntity {
    const { id, _id, productId, url, order = 0 } = object;

    if (!id && !_id) throw CustomError.badRequest('ProductImage id is missing');
    if (!productId) throw CustomError.badRequest('ProductImage productId is missing');
    if (!url) throw CustomError.badRequest('ProductImage url is missing');

    return new ProductImageEntity(id ?? _id, productId, url, order);
  }
}
