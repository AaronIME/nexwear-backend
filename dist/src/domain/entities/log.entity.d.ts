import { LogLevel } from '../types/log-level.type';
export declare class LogEntity {
    readonly id: string;
    readonly level: LogLevel;
    readonly message: string;
    readonly service: string;
    readonly timestamp: Date;
    constructor(id: string, level: LogLevel, message: string, service: string, timestamp: Date);
    static fromObject(object: {
        [key: string]: any;
    }): LogEntity;
}
//# sourceMappingURL=log.entity.d.ts.map