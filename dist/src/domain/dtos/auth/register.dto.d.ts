export declare class RegisterDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    constructor(name: string, email: string, password: string);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, RegisterDto?];
}
//# sourceMappingURL=register.dto.d.ts.map