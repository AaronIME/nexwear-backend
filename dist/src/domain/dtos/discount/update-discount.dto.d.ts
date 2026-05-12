export declare class UpdateDiscountDto {
    readonly id: string;
    readonly name?: string | undefined;
    readonly percentage?: number | undefined;
    readonly startDate?: Date | undefined;
    readonly endDate?: Date | undefined;
    constructor(id: string, name?: string | undefined, percentage?: number | undefined, startDate?: Date | undefined, endDate?: Date | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, UpdateDiscountDto?];
}
//# sourceMappingURL=update-discount.dto.d.ts.map