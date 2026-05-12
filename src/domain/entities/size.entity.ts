import { CustomError } from './errors/custom.error';

export class SizeEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  static fromObject(object: { [key: string]: any }): SizeEntity {
    const { id, _id, name } = object;

    if (!id && !_id) throw CustomError.badRequest('Size id is missing');
    if (!name) throw CustomError.badRequest('Size name is missing');

    return new SizeEntity(id ?? _id, name);
  }
}
