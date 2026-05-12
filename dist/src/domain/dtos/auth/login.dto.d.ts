export declare class LoginDto {
    readonly email: string;
    readonly password: string;
    constructor(email: string, password: string);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, LoginDto?];
}
//# sourceMappingURL=login.dto.d.ts.map