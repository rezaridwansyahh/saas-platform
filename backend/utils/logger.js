const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;
const fs = require('fs');
const path = require('path');
const os = require('os');

const homeDir= os.homedir();
const logDir = path.join( homeDir, 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logFormat = printf(({level, message, timestamp, stack}) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    errors({stack: true}),
    logFormat
  ),
  transports: [
    new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error'}),
    new transports.File({ filename: path.join(logDir, 'combined.log')}),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}


module.exports = logger;