export declare class UpdateCategoryDto {
    readonly id: string;
    readonly name?: string | undefined;
    constructor(id: string, name?: string | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, UpdateCategoryDto?];
}
//# sourceMappingURL=update-category.dto.d.ts.map