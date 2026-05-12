import { LogLevel } from '../../types/log-level.type';

export class CreateLogDto {
  constructor(
    public readonly level: LogLevel,
    public readonly message: string,
    public readonly service: string,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, CreateLogDto?] {
    const { level, message, service } = object;

    if (!level) return ['Level property is required'];
    if (!Object.values(LogLevel).includes(level))
      return [`Level must be one of: ${Object.values(LogLevel).join(', ')}`];

    if (!message) return ['Message property is required'];
    if (typeof message !== 'string' || message.trim().length === 0)
      return ['Message must be a non-empty string'];

    if (!service) return ['Service property is required'];
    if (typeof service !== 'string' || service.trim().length === 0)
      return ['Service must be a non-empty string'];

    return [undefined, new CreateLogDto(level as LogLevel, message.trim(), service.trim())];
  }
}
