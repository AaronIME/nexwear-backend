import { Role } from '../../types/role.type';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class CreateUserDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: Role,
    public readonly isActive?: boolean,
    public readonly isDeleted?: boolean,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, CreateUserDto?] {
    const { name, email, password, role = Role.USER, isActive, isDeleted } = object;

    if (!name) return ['Name property is required'];
    if (typeof name !== 'string' || name.trim().length === 0) return ['Name must be a non-empty string'];

    if (!email) return ['Email property is required'];
    if (!emailRegex.test(email)) return ['Email has an invalid format'];

    if (!password) return ['Password property is required'];
    if (typeof password !== 'string' || password.length < 6) return ['Password must be at least 6 characters'];

    if (!Object.values(Role).includes(role)) return [`Role must be one of: ${Object.values(Role).join(', ')}`];

    if (isActive !== undefined && typeof isActive !== 'boolean') return ['IsActive must be a boolean'];
    if (isDeleted !== undefined && typeof isDeleted !== 'boolean') return ['IsDeleted must be a boolean'];

    return [
      undefined,
      new CreateUserDto(
        name.trim(),
        email.toLowerCase().trim(),
        password,
        role as Role,
        isActive,
        isDeleted,
      ),
    ];
  }
}
