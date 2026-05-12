import { CustomError } from './errors/custom.error';
import { LogLevel } from '../types/log-level.type';

export class LogEntity {
  constructor(
    public readonly id: string,
    public readonly level: LogLevel,
    public readonly message: string,
    public readonly service: string,
    public readonly timestamp: Date,
  ) {}

  static fromObject(object: { [key: string]: any }): LogEntity {
    const { id, _id, level, message, service, timestamp } = object;

    if (!id && !_id) throw CustomError.badRequest('Log id is missing');
    if (!level) throw CustomError.badRequest('Log level is missing');
    if (!message) throw CustomError.badRequest('Log message is missing');
    if (!service) throw CustomError.badRequest('Log service is missing');
    if (!timestamp) throw CustomError.badRequest('Log timestamp is missing');

    return new LogEntity(
      id ?? _id,
      level as LogLevel,
      message,
      service,
      new Date(timestamp),
    );
  }
}
