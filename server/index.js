const { log } = require('./helpers/logs');
const config = require('../config/config');
const app = require('../config/express');
const sampleData = require('../config/mongoose');
// khởi chạy server mongoose và tạo dữ liệu giả
sampleData();
// mở server và listen qua port đã được thiệt lập
// xem file config/config.js
app.listen(config.port, () => {
  console.info(`Server started on port ${config.port} in ${config.env} mode`);
  log({
    title: 'Browser ready!',
    level: 'info',
    message: `Server started on port ${config.port} in ${config.env} mode`,
    notify: true,
  });
});

module.exports = app;
