export declare class ColorEntity {
    readonly id: string;
    readonly name: string;
    readonly hex: string;
    constructor(id: string, name: string, hex: string);
    static fromObject(object: {
        [key: string]: any;
    }): ColorEntity;
}
//# sourceMappingURL=color.entity.d.ts.map