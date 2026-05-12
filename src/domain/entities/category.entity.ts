import { CustomError } from './errors/custom.error';

export class CategoryEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  static fromObject(object: { [key: string]: any }): CategoryEntity {
    const { id, _id, name } = object;

    if (!id && !_id) throw CustomError.badRequest('Category id is missing');
    if (!name) throw CustomError.badRequest('Category name is missing');

    return new CategoryEntity(id ?? _id, name);
  }
}
