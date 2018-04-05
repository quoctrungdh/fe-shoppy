const httpStatus = require('http-status');
// link: https://stackoverflow.com/questions/44225376/node-mongoose-mocha-how-to-handle-a-promise-reject-in-my-test
/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, status, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor.name);
  }
}
/**
 * Class để biểu thị cho một API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
     * Tạo một API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code của error.
     * @param {boolean} isPublic - Thông báo lỗi có được hiển thị lên cho người dùng hay không.
     */
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false) {
    super(message, status, isPublic);
  }
}


module.exports = APIError;
