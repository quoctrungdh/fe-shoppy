const notifier = require('node-notifier');
const colors = require('colors/safe');
// dùng thư viện node-notifier và colors để thông báo lỗi ra ngoài màn hình
// link: https://github.com/mikaelbr/node-notifier
// link: https://github.com/Marak/colors.js
exports.log = function log(options) {
  const title = `${options.title.toUpperCase()}`;

  if (options.notify) {
    notifier.notify({
      title,
      message: options.message,
    });
  }

  const level = options.level || 'info';
  const msg = `==> ${title} -> ${options.message}`;

  switch (level) {
    case 'warn':
      console.log(colors.yellow(msg));
      break;
    case 'error':
      console.log(colors.bgRed.white(msg));
      break;
    case 'info':
    default:
      console.log(colors.green(msg));
  }
};
