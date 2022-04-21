const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
);

const logConfig = {
    logFolder: './/logs//',
    logFile: 'log-%DATE%.log',
};

const transport = new DailyRotateFile({
    filename: logConfig.logFolder + logConfig.logFile,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '5d',
    prepend: true,
    level: 'info',
});

const logger = winston.createLogger({
    format: logFormat,
    transports: [transport, new winston.transports.Console({ level: 'info' })],
});

class LoggerStream {
    static write(text) {
        logger.info(text);
    }
}

module.exports = { logger, LoggerStream };
