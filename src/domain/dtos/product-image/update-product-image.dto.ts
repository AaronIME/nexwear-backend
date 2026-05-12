import { UploadedFile } from 'express-fileupload';

export class UpdateProductImageDto {
  constructor(
    public readonly id: string,
    public readonly url?: string,
    public readonly order?: number,
    public readonly file?: UploadedFile,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, UpdateProductImageDto?] {
    const { id, url, order: orderInput, file } = object;

    if (!id) return ['Id property is required'];

    if (url !== undefined && url !== null && (typeof url !== 'string' || url.trim().length === 0)) {
      return ['Url must be a non-empty string'];
    }

    let order: number | undefined;
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
    }

    const hasUpdate = hasFile || (url !== undefined && url !== null) || order !== undefined;

    if (!hasUpdate) {
      return ['At least one of url, order, or image file must be provided'];
    }

    return [
      undefined,
      new UpdateProductImageDto(
        String(id),
        url !== undefined && url !== null ? url.trim() : undefined,
        order,
        hasFile ? (file as UploadedFile) : undefined,
      ),
    ];
  }
}
