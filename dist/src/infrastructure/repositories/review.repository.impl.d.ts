import { ReviewDatasource, ReviewPaginationResult } from '../../domain/datasources/review.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateReviewDto } from '../../domain/dtos/review/create-review.dto';
import { UpdateReviewDto } from '../../domain/dtos/review/update-review.dto';
import { ReviewEntity } from '../../domain/entities/review.entity';
import { ReviewRepository } from '../../domain/repositories/review.repository';
export declare class ReviewRepositoryImpl implements ReviewRepository {
    private readonly datasource;
    constructor(datasource: ReviewDatasource);
    create(dto: CreateReviewDto): Promise<ReviewEntity>;
    findAll(dto: PaginationDto): Promise<ReviewPaginationResult>;
    findById(id: string): Promise<ReviewEntity>;
    findByProductId(productId: string, dto: PaginationDto): Promise<ReviewPaginationResult>;
    findByUserId(userId: string, dto: PaginationDto): Promise<ReviewPaginationResult>;
    update(dto: UpdateReviewDto): Promise<ReviewEntity>;
    delete(id: string): Promise<ReviewEntity>;
}
//# sourceMappingURL=review.repository.impl.d.ts.map