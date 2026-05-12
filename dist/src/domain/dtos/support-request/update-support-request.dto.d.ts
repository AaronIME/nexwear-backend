import { SupportStatus } from '../../types/support-status.type';
export declare class UpdateSupportRequestDto {
    readonly id: string;
    readonly status: SupportStatus;
    constructor(id: string, status: SupportStatus);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, UpdateSupportRequestDto?];
}
//# sourceMappingURL=update-support-request.dto.d.ts.map