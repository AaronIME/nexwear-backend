export class CreateCartDto {
  constructor(public readonly userId: string) {}

  static create(object: { [key: string]: any }): [string | undefined, CreateCartDto?] {
    const { userId } = object;

    if (!userId) return ['UserId property is required'];

    return [undefined, new CreateCartDto(userId)];
  }
}
