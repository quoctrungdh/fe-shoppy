const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../../config/param-validation');
const productCtrl = require('./product.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/product - Lấy danh sách product */
  .get(productCtrl.list)
  /** POST /api/product - Tạo product mới */
  .post(validate(paramValidation.createProduct), productCtrl.create);
router.route('/:sku')
/** GET /api/product/:sku - Lấy một product */
  .get(productCtrl.get)
  /** PUT /api/product/:sku - Chỉnh sửa thông tin một product */
  .put(validate(paramValidation.updateProduct), productCtrl.update)
  /** DELETE /api/product/:sku - Xoá một product */
  .delete(productCtrl.remove);
/** Load một product khi param của API là sku  */
router.param('sku', productCtrl.load);

module.exports = router;
