import Transport from 'winston-transport';
import { LogRepository } from '../../domain/repositories/log.repository';
export declare class PrismaTransport extends Transport {
    private readonly logRepository;
    constructor(logRepository: LogRepository, opts?: Transport.TransportStreamOptions);
    log(info: any, callback: () => void): void;
    private mapWinstonLevelToLogLevel;
}
//# sourceMappingURL=prisma.transport.d.ts.map