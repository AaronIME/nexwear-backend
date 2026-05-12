const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export class UpdateColorDto {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly hex?: string,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, UpdateColorDto?] {
    const { id, name, hex } = object;

    if (!id) return ['Id property is required'];

    if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
      return ['Name must be a non-empty string'];
    }

    if (hex !== undefined && !hexColorRegex.test(hex)) {
      return ['Hex must be a valid color code (e.g. #FFF or #FFFFFF)'];
    }

    return [undefined, new UpdateColorDto(id, name?.trim(), hex?.toUpperCase())];
  }
}
