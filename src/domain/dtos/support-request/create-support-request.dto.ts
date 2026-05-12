export class CreateSupportRequestDto {
  constructor(
    public readonly userId: string,
    public readonly subject: string,
    public readonly message: string,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, CreateSupportRequestDto?] {
    const { userId, subject, message } = object;

    if (!userId) return ['UserId property is required'];

    if (!subject) return ['Subject property is required'];
    if (typeof subject !== 'string' || subject.trim().length === 0) return ['Subject must be a non-empty string'];

    if (!message) return ['Message property is required'];
    if (typeof message !== 'string' || message.trim().length === 0) return ['Message must be a non-empty string'];

    return [undefined, new CreateSupportRequestDto(userId, subject.trim(), message.trim())];
  }
}
