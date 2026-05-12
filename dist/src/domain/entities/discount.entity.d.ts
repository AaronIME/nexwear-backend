export declare class DiscountEntity {
    readonly id: string;
    readonly name: string;
    readonly percentage: number;
    readonly startDate: Date;
    readonly endDate: Date;
    constructor(id: string, name: string, percentage: number, startDate: Date, endDate: Date);
    static fromObject(object: {
        [key: string]: any;
    }): DiscountEntity;
}
//# sourceMappingURL=discount.entity.d.ts.map