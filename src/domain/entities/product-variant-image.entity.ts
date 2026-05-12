import { CustomError } from './errors/custom.error';

export class ProductVariantImageEntity {
  constructor(
    public readonly id: string,
    public readonly productVariantId: string,
    public readonly url: string,
    public readonly order: number,
  ) {}

  static fromObject(object: { [key: string]: any }): ProductVariantImageEntity {
    const { id, _id, productVariantId, url, order } = object;

    if (!id && !_id) throw CustomError.badRequest('ProductVariantImage id is missing');
    if (!productVariantId) throw CustomError.badRequest('ProductVariantImage productVariantId is missing');
    if (!url) throw CustomError.badRequest('ProductVariantImage url is missing');
    if (order === undefined || order === null) throw CustomError.badRequest('ProductVariantImage order is missing');

    return new ProductVariantImageEntity(
      id ?? _id,
      productVariantId,
      url,
      order,
    );
  }
}
