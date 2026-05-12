export declare class CreateReviewDto {
    readonly userId: string;
    readonly productId: string;
    readonly score: number;
    readonly comment?: string | undefined;
    constructor(userId: string, productId: string, score: number, comment?: string | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, CreateReviewDto?];
}
//# sourceMappingURL=create-review.dto.d.ts.map