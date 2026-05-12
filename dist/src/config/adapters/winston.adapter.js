"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_2 = require("winston");
const prisma_transport_1 = require("../transports/prisma.transport");
const log_repository_impl_1 = require("../../infrastructure/repositories/log.repository.impl");
const log_prisma_datasource_impl_1 = require("../../infrastructure/datasources/log-prisma.datasource.impl");
const postgres_database_1 = require("../../data/postgres/postgres-database");
const { combine, timestamp, json, printf } = winston_2.format;
const customFormat = printf(({ level, message, service, timestamp }) => {
    return `${timestamp} [${service}] ${level}: ${message}`;
});
const logDatasource = new log_prisma_datasource_impl_1.LogPrismaDatasourceImpl(postgres_database_1.prisma);
const logRepository = new log_repository_impl_1.LogRepositoryImpl(logDatasource);
const logger = winston_1.default.createLogger({
    format: combine(timestamp(), json()),
    transports: [
        new winston_1.default.transports.Console({
            format: combine(timestamp(), customFormat),
        }),
        new prisma_transport_1.PrismaTransport(logRepository),
        new winston_1.default.transports.File({
            filename: 'info.log',
            level: 'info',
        }),
        new winston_1.default.transports.File({
            filename: 'error.log',
            level: 'error',
        }),
        new winston_1.default.transports.File({
            filename: 'combined.log',
        }),
    ],
});
const buildLogger = (service) => {
    return {
        info: (message) => {
            logger.log('info', {
                service,
                message,
            });
        },
        error: (message) => {
            logger.log('error', {
                service,
                message,
            });
        },
    };
};
exports.buildLogger = buildLogger;
//# sourceMappingURL=winston.adapter.js.map