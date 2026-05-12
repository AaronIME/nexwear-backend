export declare class UpdateReviewDto {
    readonly id: string;
    readonly score?: number | undefined;
    readonly comment?: string | undefined;
    readonly isVisible?: boolean | undefined;
    constructor(id: string, score?: number | undefined, comment?: string | undefined, isVisible?: boolean | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, UpdateReviewDto?];
}
//# sourceMappingURL=update-review.dto.d.ts.map