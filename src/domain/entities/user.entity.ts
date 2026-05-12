import { CustomError } from './errors/custom.error';
import { Role } from '../types/role.type';

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: Role,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly isActive: boolean,
    public readonly isDeleted: boolean,
  ) {}

  static fromObject(object: { [key: string]: any }): UserEntity {
    const {
      id,
      _id,
      name,
      email,
      role,
      createdAt,
      updatedAt,
      isActive = true,
      isDeleted = false,
    } = object;

    if (!id && !_id) throw CustomError.badRequest('User id is missing');
    if (!name) throw CustomError.badRequest('User name is missing');
    if (!email) throw CustomError.badRequest('User email is missing');
    if (!role) throw CustomError.badRequest('User role is missing');

    return new UserEntity(
      id ?? _id,
      name,
      email,
      role as Role,
      new Date(createdAt),
      new Date(updatedAt),
      Boolean(isActive),
      Boolean(isDeleted),
    );
  }
}
