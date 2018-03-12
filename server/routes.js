const express = require('express');
const productRoutes = require('./api/product/product.route');

const router = express.Router();
// tạo route đại đễ test
router.get('/test', (req, res) =>
  res.send('OK'));
// điều hướng route cho product
// link: http://localhost:1235/api/product (mặc định sẽ trả lên danh sách product)
router.use('/product', productRoutes);

module.exports = router;
