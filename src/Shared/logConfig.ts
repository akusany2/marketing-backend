var winston = require('winston');
require('winston-daily-rotate-file');
// prettier-ignore
var transport_error = new (winston.transports.DailyRotateFile)({
  name: 'error',
  dirname: 'logs',
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  level: 'error',
  zippedArchive: false,
  json: true
}),
transport_default = new (winston.transports.DailyRotateFile)({
  name: 'default',
  dirname: 'logs',
  filename: 'combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: false,
  json: true
});

export const transports = [transport_error, transport_default];
