import winston from 'winston';
import expressWinston from 'express-winston';

const { combine, prettyPrint, timestamp, printf, colorize } = winston.format;

const logger = winston.createLogger({
  level: 'debug',
  format: combine(
    prettyPrint(),
    timestamp({
      format: 'MM-DD-YYYY hh:mm:ss',
    }),
    colorize(),
    printf(({ level, message, timestamp }) => {
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
  ignoreRoute: function (req, res) {
    return false;
  },
});

export default logger;
