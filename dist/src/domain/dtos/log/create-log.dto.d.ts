import { LogLevel } from '../../types/log-level.type';
export declare class CreateLogDto {
    readonly level: LogLevel;
    readonly message: string;
    readonly service: string;
    constructor(level: LogLevel, message: string, service: string);
    static create(object: {
        [key: string]: any;
    }): [string | undefined, CreateLogDto?];
}
//# sourceMappingURL=create-log.dto.d.ts.map