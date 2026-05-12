import { CustomError } from './errors/custom.error';

export class ReviewEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly productId: string,
    public readonly score: number,
    public readonly comment: string | null,
    public readonly isVisible: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static fromObject(object: { [key: string]: any }): ReviewEntity {
    const { id, _id, userId, productId, score, comment, isVisible, createdAt, updatedAt } = object;

    if (!id && !_id) throw CustomError.badRequest('Review id is missing');
    if (!userId) throw CustomError.badRequest('Review userId is missing');
    if (!productId) throw CustomError.badRequest('Review productId is missing');
    if (score === undefined || score === null) throw CustomError.badRequest('Review score is missing');
    if (isVisible === undefined || isVisible === null) {
      throw CustomError.badRequest('Review isVisible is missing');
    }
    if (!createdAt) throw CustomError.badRequest('Review createdAt is missing');
    if (!updatedAt) throw CustomError.badRequest('Review updatedAt is missing');

    return new ReviewEntity(
      id ?? _id,
      userId,
      productId,
      score,
      comment ?? null,
      isVisible,
      createdAt,
      updatedAt,
    );
  }
}
