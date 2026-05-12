import { CustomError } from './errors/custom.error';

export class ColorEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly hex: string,
  ) {}

  static fromObject(object: { [key: string]: any }): ColorEntity {
    const { id, _id, name, hex } = object;

    if (!id && !_id) throw CustomError.badRequest('Color id is missing');
    if (!name) throw CustomError.badRequest('Color name is missing');
    if (!hex) throw CustomError.badRequest('Color hex is missing');

    return new ColorEntity(id ?? _id, name, hex);
  }
}
