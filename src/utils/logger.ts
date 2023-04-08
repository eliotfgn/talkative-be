import winston from "winston";

const { combine, prettyPrint, timestamp, printf, colorize } = winston.format;

const logger = winston.createLogger({
  level: "debug",
  format: combine(
    prettyPrint(),
    timestamp(),
    colorize(),
    printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }),
  ),
  transports: [new winston.transports.Console],
});

export default logger;