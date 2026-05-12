export declare class UpdateColorDto {
    readonly id: string;
    readonly name?: string | undefined;
    readonly hex?: string | undefined;
    constructor(id: string, name?: string | undefined, hex?: string | undefined);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, UpdateColorDto?];
}
//# sourceMappingURL=update-color.dto.d.ts.map