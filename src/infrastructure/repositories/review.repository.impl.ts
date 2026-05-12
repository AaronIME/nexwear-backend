import { ReviewDatasource, ReviewPaginationResult } from '../../domain/datasources/review.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateReviewDto } from '../../domain/dtos/review/create-review.dto';
import { UpdateReviewDto } from '../../domain/dtos/review/update-review.dto';
import { ReviewEntity } from '../../domain/entities/review.entity';
import { ReviewRepository } from '../../domain/repositories/review.repository';

export class ReviewRepositoryImpl implements ReviewRepository {
  constructor(private readonly datasource: ReviewDatasource) {}

  create(dto: CreateReviewDto): Promise<ReviewEntity> {
    return this.datasource.create(dto);
  }

  findAll(dto: PaginationDto): Promise<ReviewPaginationResult> {
    return this.datasource.findAll(dto);
  }

  findById(id: string): Promise<ReviewEntity> {
    return this.datasource.findById(id);
  }

  findByProductId(productId: string, dto: PaginationDto): Promise<ReviewPaginationResult> {
    return this.datasource.findByProductId(productId, dto);
  }

  findByUserId(userId: string, dto: PaginationDto): Promise<ReviewPaginationResult> {
    return this.datasource.findByUserId(userId, dto);
  }

  update(dto: UpdateReviewDto): Promise<ReviewEntity> {
    return this.datasource.update(dto);
  }

  delete(id: string): Promise<ReviewEntity> {
    return this.datasource.delete(id);
  }
}
