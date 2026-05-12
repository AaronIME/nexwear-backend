import { CustomError } from './errors/custom.error';

export class DiscountEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly percentage: number,
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) {}

  static fromObject(object: { [key: string]: any }): DiscountEntity {
    const { id, _id, name, percentage, startDate, endDate } = object;

    if (!id && !_id) throw CustomError.badRequest('Discount id is missing');
    if (!name) throw CustomError.badRequest('Discount name is missing');
    if (percentage === undefined || percentage === null) throw CustomError.badRequest('Discount percentage is missing');
    if (!startDate) throw CustomError.badRequest('Discount startDate is missing');
    if (!endDate) throw CustomError.badRequest('Discount endDate is missing');

    return new DiscountEntity(id ?? _id, name, percentage, new Date(startDate), new Date(endDate));
  }
}
