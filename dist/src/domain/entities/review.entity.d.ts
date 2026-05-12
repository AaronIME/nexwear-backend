export declare class ReviewEntity {
    readonly id: string;
    readonly userId: string;
    readonly productId: string;
    readonly score: number;
    readonly comment: string | null;
    readonly isVisible: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: string, userId: string, productId: string, score: number, comment: string | null, isVisible: boolean, createdAt: Date, updatedAt: Date);
    static fromObject(object: {
        [key: string]: any;
    }): ReviewEntity;
}
//# sourceMappingURL=review.entity.d.ts.map