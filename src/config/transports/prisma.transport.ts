import Transport from 'winston-transport';
import { LogRepository } from '../../domain/repositories/log.repository';
import { CreateLogDto } from '../../domain/dtos/log/create-log.dto';
import { LogLevel } from '../../domain/types/log-level.type';

export class PrismaTransport extends Transport {
  constructor(private readonly logRepository: LogRepository, opts?: Transport.TransportStreamOptions) {
    super(opts);
  }

  log(info: any, callback: () => void): void {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const { level, message, service } = info;

    const logLevel = this.mapWinstonLevelToLogLevel(level);

    const [error, dto] = CreateLogDto.create({
      level: logLevel,
      message,
      service,
    });

    if (error || !dto) {
      console.error('Failed to create log DTO:', error);
      callback();
      return;
    }

    this.logRepository
      .create(dto)
      .then(() => {
        callback();
      })
      .catch((err) => {
        console.error('Failed to save log to database:', err);
        callback();
      });
  }

  private mapWinstonLevelToLogLevel(winstonLevel: string): LogLevel {
    switch (winstonLevel) {
      case 'info':
        return LogLevel.INFO;
      case 'error':
        return LogLevel.ERROR;
      // case 'warn':
      //   return LogLevel.WARN;
      // case 'debug':
      //   return LogLevel.DEBUG;
      default:
        return LogLevel.INFO;
    }
  }
}
