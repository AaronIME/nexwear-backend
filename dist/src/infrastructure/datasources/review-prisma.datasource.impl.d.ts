import { PrismaClient } from '../../../generated/prisma/client';
import { ReviewDatasource, ReviewPaginationResult } from '../../domain/datasources/review.datasource';
import { PaginationDto } from '../../domain/dtos/pagination/pagination.dto';
import { CreateReviewDto } from '../../domain/dtos/review/create-review.dto';
import { UpdateReviewDto } from '../../domain/dtos/review/update-review.dto';
import { ReviewEntity } from '../../domain/entities/review.entity';
export declare class ReviewPrismaDatasourceImpl implements ReviewDatasource {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreateReviewDto): Promise<ReviewEntity>;
    findAll(dto: PaginationDto): Promise<ReviewPaginationResult>;
    findById(id: string): Promise<ReviewEntity>;
    findByProductId(productId: string, dto: PaginationDto): Promise<ReviewPaginationResult>;
    findByUserId(userId: string, dto: PaginationDto): Promise<ReviewPaginationResult>;
    update(dto: UpdateReviewDto): Promise<ReviewEntity>;
    delete(id: string): Promise<ReviewEntity>;
}
//# sourceMappingURL=review-prisma.datasource.impl.d.ts.map