import { CustomError } from './errors/custom.error';

export class BrandEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  static fromObject(object: { [key: string]: any }): BrandEntity {
    const { id, _id, name } = object;

    if (!id && !_id) throw CustomError.badRequest('Brand id is missing');
    if (!name) throw CustomError.badRequest('Brand name is missing');

    return new BrandEntity(id ?? _id, name);
  }
}
