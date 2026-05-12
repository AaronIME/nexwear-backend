export class CreateBrandDto {
  constructor(public readonly name: string) {}

  static create(object: { [key: string]: any }): [string | undefined, CreateBrandDto?] {
    const { name } = object;

    if (!name) return ['Name property is required'];
    if (typeof name !== 'string' || name.trim().length === 0) return ['Name must be a non-empty string'];

    return [undefined, new CreateBrandDto(name.trim())];
  }
}
