"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReviewDto = void 0;
class UpdateReviewDto {
    id;
    score;
    comment;
    isVisible;
    constructor(id, score, comment, isVisible) {
        this.id = id;
        this.score = score;
        this.comment = comment;
        this.isVisible = isVisible;
    }
    static create(object) {
        const { id, score, comment, isVisible } = object;
        if (!id)
            return ['Id property is required'];
        if (typeof id !== 'string' || id.trim().length === 0) {
            return ['Id must be a non-empty string'];
        }
        if (score !== undefined && score !== null) {
            if (typeof score !== 'number')
                return ['Score must be a number'];
            if (score < 1 || score > 5)
                return ['Score must be between 1 and 5'];
        }
        if (comment !== undefined && comment !== null) {
            if (typeof comment !== 'string')
                return ['Comment must be a string'];
            if (comment.trim().length === 0)
                return ['Comment must be a non-empty string'];
        }
        if (isVisible !== undefined && isVisible !== null) {
            if (typeof isVisible !== 'boolean')
                return ['IsVisible must be a boolean'];
        }
        return [undefined, new UpdateReviewDto(id.trim(), score, comment?.trim(), isVisible)];
    }
}
exports.UpdateReviewDto = UpdateReviewDto;
//# sourceMappingURL=update-review.dto.js.map