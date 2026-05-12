export class CreateProductVariantImageDto {
  constructor(
    public readonly productVariantId: string,
    public readonly url: string,
    public readonly order: number,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, CreateProductVariantImageDto?] {
    const { productVariantId, url, order = 0 } = object;

    if (!productVariantId) return ['ProductVariantId property is required'];
    if (typeof productVariantId !== 'string' || productVariantId.trim().length === 0) {
      return ['ProductVariantId must be a non-empty string'];
    }

    if (!url) return ['Url property is required'];
    if (typeof url !== 'string' || url.trim().length === 0) {
      return ['Url must be a non-empty string'];
    }

    if (typeof order !== 'number' || order < 0) {
      return ['Order must be a non-negative number'];
    }

    return [undefined, new CreateProductVariantImageDto(productVariantId.trim(), url.trim(), order)];
  }
}
