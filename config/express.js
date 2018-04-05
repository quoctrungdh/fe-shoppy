const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const expressValidation = require('express-validation');
const helmet = require('helmet');
const winstonInstance = require('./winston');
const routes = require('../server/routes');
const config = require('./config');
const APIError = require('../server/helpers/APIError');

// khởi tạo môi trường express
const app = express();

// trong môi trường dev dùng middleware morgan để show log
// link: https://github.com/expressjs/morgan
if (config.env === 'development') {
  app.use(logger('dev'));
}
// dùng middleware body-parser để chuyển các request tới server vào req.body
// link: https://github.com/expressjs/body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// dùng middleware cookie-parser để chuyển cookie từ header (nếu có) vào req.cookies
// link: https://github.com/expressjs/cookie-parser
app.use(cookieParser());
// dùng middleware compression để nén dữ liệu server đã lấy/xứ lý trước khi response lên cho người dùng
// link: https://github.com/expressjs/compression
app.use(compress());
// dùng middleware method-override cho phép sử dụng các method PUT và DELETE trong trường hợp client không hỗ trợ
// link: https://github.com/expressjs/method-override
app.use(methodOverride());
// dùng middleware helmet để tăng cường bảo mật cho môi trường express
// link: https://github.com/helmetjs/helmet
app.use(helmet());
// dùng middleware cors để bật chế độ CORS - Cross Origin Resource Sharing
// link: https://github.com/expressjs/cors
app.use(cors());
// trong môi trường dev dùng middleware express-winston để show log cho API
// https://github.com/bithavoc/express-winston
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  // xem file winston.js trong thư mục config
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // cho phép log metadata
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true, // tô màu status code
  }));
}
// cho phép chia sẻ hình ảnh, font, các file css, js thông qua api
// link: https://expressjs.com/en/starter/static-files.html
// vd khi người dùng vào http://localhost:1235/static/images/img1.png thì sẽ truy cập được tới hình ảnh trong folder public/images/img1.png
app.use('/static', express.static(path.join(__dirname, '../public')));
// điều hướng tất cả các routes vào đường dẫn /api
app.use('/api', routes);
// dùng middleware express-validation để validate body, params, query, headers và cookies của một request, nếu không thoả với các rule thì sẽ báo lỗi
// link: https://github.com/AndrewKeig/express-validation
app.use((err, req, res, next) => {
  // nếu error không phải là một instance của APIError thì convert nó lại
  // xem file APIError.js trong thư mục server/api/helpers
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});
// dùng middleware http-status để bắt status của API
// link: https://github.com/adaltas/node-http-status
// bắt lỗi 404 và đẩy vào error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});
// log error nếu không phải đang trong môi trường test
if (config.env !== 'test') {
  // xem file winston.js trong thư mục config
  app.use(expressWinston.errorLogger({
    winstonInstance,
  }));
}
// error handler, trả lên stacktrace của lỗi khi đang trong môi trường dev
app.use((err, req, res, next) =>
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {},
  }));

module.exports = app;
