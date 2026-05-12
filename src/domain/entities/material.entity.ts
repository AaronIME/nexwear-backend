import { CustomError } from './errors/custom.error';

export class MaterialEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  static fromObject(object: { [key: string]: any }): MaterialEntity {
    console.log({object})
    const { id, _id, name } = object;

    if (!id && !_id) throw CustomError.badRequest('Material id is missing');
    if (!name) throw CustomError.badRequest('Material name is missing');

    return new MaterialEntity(id ?? _id, name);
  }
}
