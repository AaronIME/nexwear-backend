export declare class CreateColorDto {
    readonly name: string;
    readonly hex: string;
    constructor(name: string, hex: string);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, CreateColorDto?];
}
//# sourceMappingURL=create-color.dto.d.ts.map