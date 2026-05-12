import { CustomError } from './errors/custom.error';

export class TagEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  static fromObject(object: { [key: string]: any }): TagEntity {
    const { id, _id, name } = object;

    if (!id && !_id) throw CustomError.badRequest('Tag id is missing');
    if (!name) throw CustomError.badRequest('Tag name is missing');

    return new TagEntity(id ?? _id, name);
  }
}
