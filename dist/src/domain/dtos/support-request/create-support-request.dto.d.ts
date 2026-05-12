export declare class CreateSupportRequestDto {
    readonly userId: string;
    readonly subject: string;
    readonly message: string;
    constructor(userId: string, subject: string, message: string);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, CreateSupportRequestDto?];
}
//# sourceMappingURL=create-support-request.dto.d.ts.map