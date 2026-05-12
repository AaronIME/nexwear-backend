"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewEntity = void 0;
const custom_error_1 = require("./errors/custom.error");
class ReviewEntity {
    id;
    userId;
    productId;
    score;
    comment;
    isVisible;
    createdAt;
    updatedAt;
    constructor(id, userId, productId, score, comment, isVisible, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.score = score;
        this.comment = comment;
        this.isVisible = isVisible;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromObject(object) {
        const { id, _id, userId, productId, score, comment, isVisible, createdAt, updatedAt } = object;
        if (!id && !_id)
            throw custom_error_1.CustomError.badRequest('Review id is missing');
        if (!userId)
            throw custom_error_1.CustomError.badRequest('Review userId is missing');
        if (!productId)
            throw custom_error_1.CustomError.badRequest('Review productId is missing');
        if (score === undefined || score === null)
            throw custom_error_1.CustomError.badRequest('Review score is missing');
        if (isVisible === undefined || isVisible === null) {
            throw custom_error_1.CustomError.badRequest('Review isVisible is missing');
        }
        if (!createdAt)
            throw custom_error_1.CustomError.badRequest('Review createdAt is missing');
        if (!updatedAt)
            throw custom_error_1.CustomError.badRequest('Review updatedAt is missing');
        return new ReviewEntity(id ?? _id, userId, productId, score, comment ?? null, isVisible, createdAt, updatedAt);
    }
}
exports.ReviewEntity = ReviewEntity;
//# sourceMappingURL=review.entity.js.map