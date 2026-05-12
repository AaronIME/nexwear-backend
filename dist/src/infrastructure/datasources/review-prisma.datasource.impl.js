"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewPrismaDatasourceImpl = void 0;
const review_entity_1 = require("../../domain/entities/review.entity");
const custom_error_1 = require("../../domain/entities/errors/custom.error");
class ReviewPrismaDatasourceImpl {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const { userId, productId, score, comment } = dto;
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw custom_error_1.CustomError.notFound(`User with id "${userId}" not found`);
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw custom_error_1.CustomError.notFound(`Product with id "${productId}" not found`);
        const existing = await this.prisma.review.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });
        if (existing) {
            throw custom_error_1.CustomError.badRequest('User has already reviewed this product');
        }
        const review = await this.prisma.$transaction(async (tx) => {
            const newReview = await tx.review.create({
                data: {
                    userId,
                    productId,
                    score,
                    comment: comment ?? null,
                },
            });
            await tx.product.update({
                where: { id: productId },
                data: {
                    reviewCount: { increment: 1 },
                    ratingSum: { increment: score },
                    averageRating: {
                        set: (product.ratingSum + score) / (product.reviewCount + 1),
                    },
                },
            });
            return newReview;
        });
        return review_entity_1.ReviewEntity.fromObject(review);
    }
    async findAll(dto) {
        const { page, limit } = dto;
        const skip = (page - 1) * limit;
        const [total, reviews] = await this.prisma.$transaction([
            this.prisma.review.count(),
            this.prisma.review.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
        ]);
        const pages = Math.ceil(total / limit);
        return {
            page,
            limit,
            total,
            pages,
            next: page < pages ? `api/reviews?page=${page + 1}&limit=${limit}` : undefined,
            prev: page > 1 ? `api/reviews?page=${page - 1}&limit=${limit}` : undefined,
            reviews: reviews.map(review_entity_1.ReviewEntity.fromObject),
        };
    }
    async findById(id) {
        const review = await this.prisma.review.findUnique({ where: { id } });
        if (!review)
            throw custom_error_1.CustomError.notFound(`Review with id "${id}" not found`);
        return review_entity_1.ReviewEntity.fromObject(review);
    }
    async findByProductId(productId, dto) {
        const { page, limit } = dto;
        const skip = (page - 1) * limit;
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw custom_error_1.CustomError.notFound(`Product with id "${productId}" not found`);
        const [total, reviews] = await this.prisma.$transaction([
            this.prisma.review.count({ where: { productId } }),
            this.prisma.review.findMany({
                where: { productId },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
        ]);
        const pages = Math.ceil(total / limit);
        return {
            page,
            limit,
            total,
            pages,
            next: page < pages ? `api/reviews/product/${productId}?page=${page + 1}&limit=${limit}` : undefined,
            prev: page > 1 ? `api/reviews/product/${productId}?page=${page - 1}&limit=${limit}` : undefined,
            reviews: reviews.map(review_entity_1.ReviewEntity.fromObject),
        };
    }
    async findByUserId(userId, dto) {
        const { page, limit } = dto;
        const skip = (page - 1) * limit;
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw custom_error_1.CustomError.notFound(`User with id "${userId}" not found`);
        const [total, reviews] = await this.prisma.$transaction([
            this.prisma.review.count({ where: { userId } }),
            this.prisma.review.findMany({
                where: { userId },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
        ]);
        const pages = Math.ceil(total / limit);
        return {
            page,
            limit,
            total,
            pages,
            next: page < pages ? `api/reviews/user/${userId}?page=${page + 1}&limit=${limit}` : undefined,
            prev: page > 1 ? `api/reviews/user/${userId}?page=${page - 1}&limit=${limit}` : undefined,
            reviews: reviews.map(review_entity_1.ReviewEntity.fromObject),
        };
    }
    async update(dto) {
        const { id, score, comment, isVisible } = dto;
        const existingReview = await this.findById(id);
        const review = await this.prisma.$transaction(async (tx) => {
            const updated = await tx.review.update({
                where: { id },
                data: {
                    ...(score !== undefined && { score }),
                    ...(comment !== undefined && { comment: comment ?? null }),
                    ...(isVisible !== undefined && { isVisible }),
                },
            });
            if (score !== undefined && score !== existingReview.score) {
                const product = await tx.product.findUnique({
                    where: { id: existingReview.productId },
                });
                if (product) {
                    const scoreDiff = score - existingReview.score;
                    const newRatingSum = product.ratingSum + scoreDiff;
                    const newAverageRating = newRatingSum / product.reviewCount;
                    await tx.product.update({
                        where: { id: existingReview.productId },
                        data: {
                            ratingSum: newRatingSum,
                            averageRating: newAverageRating,
                        },
                    });
                }
            }
            return updated;
        });
        return review_entity_1.ReviewEntity.fromObject(review);
    }
    async delete(id) {
        const existingReview = await this.findById(id);
        const deleted = await this.prisma.$transaction(async (tx) => {
            const deletedReview = await tx.review.delete({ where: { id } });
            const product = await tx.product.findUnique({
                where: { id: existingReview.productId },
            });
            if (product && product.reviewCount > 0) {
                const newReviewCount = product.reviewCount - 1;
                const newRatingSum = product.ratingSum - existingReview.score;
                const newAverageRating = newReviewCount > 0 ? newRatingSum / newReviewCount : 0;
                await tx.product.update({
                    where: { id: existingReview.productId },
                    data: {
                        reviewCount: newReviewCount,
                        ratingSum: newRatingSum,
                        averageRating: newAverageRating,
                    },
                });
            }
            return deletedReview;
        });
        return review_entity_1.ReviewEntity.fromObject(deleted);
    }
}
exports.ReviewPrismaDatasourceImpl = ReviewPrismaDatasourceImpl;
//# sourceMappingURL=review-prisma.datasource.impl.js.map