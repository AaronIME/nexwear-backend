import { Role } from "../../types/role.type";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class UpdateUserDto {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly email?: string,
    public readonly password?: string,
    public readonly role?: Role,
    public readonly isActive?: boolean,
    public readonly isDeleted?: boolean,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, UpdateUserDto?] {
    const { id, name, email, password, role, isActive, isDeleted } = object;

    if (!id) return ['Id property is required'];

    if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
      return ['Name must be a non-empty string'];
    }

    if (email !== undefined && !emailRegex.test(email)) {
      return ['Email has an invalid format'];
    }

    if (password !== undefined && (typeof password !== 'string' || password.length < 6)) {
      return ['Password must be at least 6 characters'];
    }

    if (role !== undefined && !Object.values(Role).includes(role)) {
      return [`Role must be one of: ${Object.values(Role).join(', ')}`];
    }

    if (isActive !== undefined && typeof isActive !== 'boolean') return ['IsActive must be a boolean'];
    if (isDeleted !== undefined && typeof isDeleted !== 'boolean') return ['IsDeleted must be a boolean'];

    return [
      undefined,
      new UpdateUserDto(
        id,
        name?.trim(),
        email?.toLowerCase().trim(),
        password,
        role as Role,
        isActive,
        isDeleted,
      ),
    ];
  }
}
