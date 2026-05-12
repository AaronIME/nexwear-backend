import { UploadedFile } from 'express-fileupload';

export class CreateProductImageDto {
  constructor(
    public readonly productId: string,
    public readonly order: number,
    public readonly url?: string,
    public readonly file?: UploadedFile,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, CreateProductImageDto?] {
    const { productId, url, order: orderInput, file } = object;

    if (!productId) return ['ProductId property is required'];

    let order = 0;
    if (orderInput !== undefined && orderInput !== null && orderInput !== '') {
      const parsed = typeof orderInput === 'string' ? parseInt(orderInput, 10) : orderInput;
      if (typeof parsed !== 'number' || Number.isNaN(parsed) || parsed < 0) {
        return ['Order must be a non-negative integer'];
      }
      order = Math.floor(parsed);
    }

    const hasFile =
      file !== undefined &&
      file !== null &&
      typeof file === 'object' &&
      Buffer.isBuffer(file.data) &&
      typeof file.name === 'string';

    if (hasFile) {
      if (!file.name || file.name.trim().length === 0) {
        return ['Image file name is required when uploading a file'];
      }
      return [
        undefined,
        new CreateProductImageDto(String(productId), order, undefined, file as UploadedFile),
      ];
    }

    if (!url || typeof url !== 'string' || url.trim().length === 0) {
      return ['Either url or an image file is required'];
    }

    return [undefined, new CreateProductImageDto(String(productId), order, url.trim())];
  }
}
