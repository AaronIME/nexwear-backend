import winston from 'winston';
import { format } from 'winston';
import { PrismaTransport } from '../transports/prisma.transport';
import { LogRepositoryImpl } from '../../infrastructure/repositories/log.repository.impl';
import { LogPrismaDatasourceImpl } from '../../infrastructure/datasources/log-prisma.datasource.impl';
import { prisma } from '../../data/postgres/postgres-database';

const { combine, timestamp, json, printf } = format;

const customFormat = printf(({ level, message, service, timestamp }) => {
  return `${timestamp} [${service}] ${level}: ${message}`;
});

const logDatasource = new LogPrismaDatasourceImpl(prisma);
const logRepository = new LogRepositoryImpl(logDatasource);

const logger = winston.createLogger({
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console({
      format: combine(timestamp(), customFormat),
    }),
    new PrismaTransport(logRepository),
    new winston.transports.File({
      filename: 'info.log',
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'combined.log',
    }),
  ],
});

export const buildLogger = (service: string) => {
  return {
    info: (message: string) => {
      logger.log('info', {
        service,
        message,
      });
    },

    error: (message: string) => {
      logger.log('error', {
        service,
        message,
      });
    },
  };
};
