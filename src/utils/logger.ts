import winston from 'winston';
import expressWinston from 'express-winston';


const formatLevel = (info) => {
  return {
    ...info,
    level: info.level.toUpperCase(),
  }
}

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format(formatLevel)(),
    winston.format.prettyPrint(),
    winston.format.timestamp({
      format: 'MM-DD-YYYY hh:mm:ss',
    }),
    winston.format.colorize(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${level}] ${timestamp}: ${message}`;
    }),
  ),
  transports: [new winston.transports.Console()],
});

export const requestLog = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize({
      message: true,
      level: true,
      all: true,
    }),
    winston.format.timestamp({
      format: 'MM-DD-YYYY hh:mm:ss',
    }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${level}] ${timestamp}: ${message}`;
    }),
  ),
  meta: true,
  expressFormat: true,
  colorize: true,
  ignoreRoute: (request, response) => false,
});

export default logger;
