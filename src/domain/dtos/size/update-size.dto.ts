export class UpdateSizeDto {
  constructor(
    public readonly id: string,
    public readonly name?: string,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, UpdateSizeDto?] {
    const { id, name } = object;

    if (!id) return ['Id property is required'];
    if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
      return ['Name must be a non-empty string'];
    }

    return [undefined, new UpdateSizeDto(id, name?.trim())];
  }
}
