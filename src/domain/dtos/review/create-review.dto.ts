export class CreateReviewDto {
  constructor(
    public readonly userId: string,
    public readonly productId: string,
    public readonly score: number,
    public readonly comment?: string,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, CreateReviewDto?] {
    const { userId, productId, score, comment } = object;

    if (!userId) return ['UserId property is required'];
    if (typeof userId !== 'string' || userId.trim().length === 0) {
      return ['UserId must be a non-empty string'];
    }

    if (!productId) return ['ProductId property is required'];
    if (typeof productId !== 'string' || productId.trim().length === 0) {
      return ['ProductId must be a non-empty string'];
    }

    if (score === undefined || score === null) return ['Score property is required'];
    if (typeof score !== 'number') return ['Score must be a number'];
    if (score < 1 || score > 5) return ['Score must be between 1 and 5'];

    if (comment !== undefined && comment !== null) {
      if (typeof comment !== 'string') return ['Comment must be a string'];
      if (comment.trim().length === 0) return ['Comment must be a non-empty string'];
    }

    return [undefined, new CreateReviewDto(userId.trim(), productId.trim(), score, comment?.trim())];
  }
}
