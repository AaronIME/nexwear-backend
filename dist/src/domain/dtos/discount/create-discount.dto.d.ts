export declare class CreateDiscountDto {
    readonly name: string;
    readonly percentage: number;
    readonly startDate: Date;
    readonly endDate: Date;
    constructor(name: string, percentage: number, startDate: Date, endDate: Date);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, CreateDiscountDto?];
}
//# sourceMappingURL=create-discount.dto.d.ts.map