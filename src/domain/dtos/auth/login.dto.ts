const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class LoginDto {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, LoginDto?] {
    const { email, password } = object;

    if (!email) return ['Email property is required'];
    if (!emailRegex.test(email)) return ['Email has an invalid format'];

    if (!password) return ['Password property is required'];
    if (typeof password !== 'string' || password.trim().length === 0) {
      return ['Password must be a non-empty string'];
    }

    return [undefined, new LoginDto(email.toLowerCase().trim(), password)];
  }
}
