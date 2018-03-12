const Product = require('./product.model');
const Color = require('../color/color.model');
/**
 * Load product và đẩy vào req.
 */
function load(req, res, next, id) {
  Product.get(id)
    .then((product) => {
      req.product = product;
      return next();
    })
    .catch(e => next(e));
}
/**
 * Get product
 * @returns {Product}
 */
function get(req, res) {
  return res.json(req.product);
}
/**
 * Tạo product mới
 * @property {string} req.body.name - Tên product.
 * @property {string} req.body.price - Giá product.
 * @returns {Product}
 */
function create(req, res, next) {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}
/**
 * Cập nhật thông tin một product
 * @property {string} req.body.name - Tên product.
 * @property {string} req.body.price - Giá product.
 * @returns {Product}
 */
function update(req, res, next) {
  const { product } = req;
  product.name = req.body.name;
  product.price = req.body.price;

  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}
/**
 * Lấy danh sách product.
 * @property {number} req.query.skip - Số lượng product sẽ bỏ qua khi lấy danh sách.
 * @property {number} req.query.limit - Giới hạn số lượng product sẽ trả lên.
 * @returns {Product[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Product.list({ limit, skip })
    .then(products => res.json(products))
    .catch(e => next(e));
}
/**
 * Xoá một product.
 * @returns {Product}
 */
function remove(req, res, next) {
  const { product } = req;
  product.remove()
    .then(deletedProduct => res.json(deletedProduct))
    .catch(e => next(e));
}

module.exports = {
  load, get, create, update, list, remove,
};
