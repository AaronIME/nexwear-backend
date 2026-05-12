export class UpdateProductVariantImageDto {
  constructor(
    public readonly id: string,
    public readonly url?: string,
    public readonly order?: number,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, UpdateProductVariantImageDto?] {
    const { id, url, order } = object;

    if (!id) return ['Id property is required'];
    if (typeof id !== 'string' || id.trim().length === 0) {
      return ['Id must be a non-empty string'];
    }

    if (url !== undefined && (typeof url !== 'string' || url.trim().length === 0)) {
      return ['Url must be a non-empty string'];
    }

    if (order !== undefined && (typeof order !== 'number' || order < 0)) {
      return ['Order must be a non-negative number'];
    }

    return [undefined, new UpdateProductVariantImageDto(id.trim(), url?.trim(), order)];
  }
}
