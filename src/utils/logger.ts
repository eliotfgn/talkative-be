import winston from "winston";

const { combine, prettyPrint, timestamp, printf, colorize } = winston.format;

const logger = winston.createLogger({
  level: "debug",
  format: combine(
    prettyPrint(),
    timestamp({
      format: "MMM-DD-YYYY hh:mm:ss"
    }),
    colorize(),
    printf(({ level, message, timestamp }) => {
      return `[${level}] ${timestamp}: ${message}`;
    }),
  ),
  transports: [new winston.transports.Console],
});

export default logger;