export class PaginationDto {
  constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, PaginationDto?] {
    const { page = 1, limit = 10 } = object;

    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    if (isNaN(parsedPage) || parsedPage < 1) return ['Page must be a positive number'];
    if (isNaN(parsedLimit) || parsedLimit < 1) return ['Limit must be a positive number'];

    return [undefined, new PaginationDto(parsedPage, parsedLimit)];
  }
}
