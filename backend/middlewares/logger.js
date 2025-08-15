const winston = require('winston');
const path = require('path');

const logPath = path.join('/home/zacvin/logs', 'app.log'); // full absolute path

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: logPath })
  ]
});

module.exports = logger;
