export declare class PaginationDto {
    readonly page: number;
    readonly limit: number;
    constructor(page: number, limit: number);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, PaginationDto?];
}
//# sourceMappingURL=pagination.dto.d.ts.map