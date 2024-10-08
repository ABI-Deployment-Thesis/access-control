const { format, createLogger, transports } = require('winston')
const { colorize, timestamp, combine, printf, errors } = format

function buildDevLogger() {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`
    })

    return createLogger({
        level: 'debug',
        format: combine(
            colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }),
            logFormat
        ),
        transports: [
            new transports.Console()
        ],
    })
}

module.exports = buildDevLogger()