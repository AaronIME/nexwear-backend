"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaTransport = void 0;
const winston_transport_1 = __importDefault(require("winston-transport"));
const create_log_dto_1 = require("../../domain/dtos/log/create-log.dto");
const log_level_type_1 = require("../../domain/types/log-level.type");
class PrismaTransport extends winston_transport_1.default {
    logRepository;
    constructor(logRepository, opts) {
        super(opts);
        this.logRepository = logRepository;
    }
    log(info, callback) {
        setImmediate(() => {
            this.emit('logged', info);
        });
        const { level, message, service } = info;
        const logLevel = this.mapWinstonLevelToLogLevel(level);
        const [error, dto] = create_log_dto_1.CreateLogDto.create({
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
    mapWinstonLevelToLogLevel(winstonLevel) {
        switch (winstonLevel) {
            case 'info':
                return log_level_type_1.LogLevel.INFO;
            case 'error':
                return log_level_type_1.LogLevel.ERROR;
            // case 'warn':
            //   return LogLevel.WARN;
            // case 'debug':
            //   return LogLevel.DEBUG;
            default:
                return log_level_type_1.LogLevel.INFO;
        }
    }
}
exports.PrismaTransport = PrismaTransport;
//# sourceMappingURL=prisma.transport.js.map