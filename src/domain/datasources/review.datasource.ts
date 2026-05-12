import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { CreateReviewDto } from '../dtos/review/create-review.dto';
import { UpdateReviewDto } from '../dtos/review/update-review.dto';
import { ReviewEntity } from '../entities/review.entity';

export interface ReviewPaginationResult {
  page: number;
  limit: number;
  total: number;
  pages: number;
  next?: string | undefined;
  prev?: string | undefined;
  reviews: ReviewEntity[];
}

export abstract class ReviewDatasource {
  abstract create(dto: CreateReviewDto): Promise<ReviewEntity>;
  abstract findAll(dto: PaginationDto): Promise<ReviewPaginationResult>;
  abstract findById(id: string): Promise<ReviewEntity>;
  abstract findByProductId(productId: string, dto: PaginationDto): Promise<ReviewPaginationResult>;
  abstract findByUserId(userId: string, dto: PaginationDto): Promise<ReviewPaginationResult>;
  abstract update(dto: UpdateReviewDto): Promise<ReviewEntity>;
  abstract delete(id: string): Promise<ReviewEntity>;
}
