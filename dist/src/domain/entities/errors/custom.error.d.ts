export declare class CustomError extends Error {
    readonly statusCode: number;
    readonly message: string;
    constructor(statusCode: number, message: string);
    static badRequest: (message: string) => CustomError;
    static unAuthorized: (message: string) => CustomError;
    static forbidden: (message: string) => CustomError;
    static notFound: (message: string) => CustomError;
    static internalServerError: (message: string) => CustomError;
}
//# sourceMappingURL=custom.error.d.ts.map