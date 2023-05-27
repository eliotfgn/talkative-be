"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const { combine, prettyPrint, timestamp, printf, colorize } = winston_1.default.format;
const logger = winston_1.default.createLogger({
    level: "debug",
    format: combine(prettyPrint(), timestamp({
        format: "MMM-DD-YYYY hh:mm:ss"
    }), colorize(), printf(({ level, message, timestamp }) => {
        return `[${level}] ${timestamp}: ${message}`;
    })),
    transports: [new winston_1.default.transports.Console],
});
exports.default = logger;
