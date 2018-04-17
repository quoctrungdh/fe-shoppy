const winston = require('winston');
// dùng thư viện winston để tạo log
// link: https://github.com/winstonjs/winston
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true,
    }),
  ],
});

module.exports = logger;
