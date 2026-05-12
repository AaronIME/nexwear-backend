import { SupportStatus } from '../types/support-status.type';
export declare class SupportRequestEntity {
    readonly id: string;
    readonly userId: string;
    readonly subject: string;
    readonly message: string;
    readonly status: SupportStatus;
    readonly createdAt: Date;
    constructor(id: string, userId: string, subject: string, message: string, status: SupportStatus, createdAt: Date);
    static fromObject(object: {
        [key: string]: any;
    }): SupportRequestEntity;
}
//# sourceMappingURL=support-request.entity.d.ts.map