const Promise = require('bluebird');
const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');
// tạo schema cho collection Product
const ProductSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  categoryId: { type: String, required: true },
  groupId: { type: String, required: true },
  colorId: { type: String, required: true },
  promotionId: { type: String },
  images: { type: Array, required: true },
  price: { type: String, required: true, match: [/^([+-]?[1-9]\d*|0)$/, 'The value of path {PATH} ({VALUE}) is not a valid price.'] },
  sizes: { type: Array },
  description: { type: String, required: true },
  comments: { type: Array },
  pin: { type: Boolean },
  userAdded: { type: String, required: true },
  userEdited: { type: String },
  dateAdded: { type: Date, default: Date.now, required: true },
  dateEdited: { type: Date, default: Date.now },
});
// dùng middleware mongoose-url-slugs để tạo slug dựa theo name của Product
// link: https://github.com/talha-asad/mongoose-url-slugs
ProductSchema.plugin(URLSlugs('name', { update: true }));
// tạo cac static method để sử dụng chung
// link: http://mongoosejs.com/docs/guide.html#statics
ProductSchema.statics = {
  /**
     * Lấy một product
     * @param {ObjectId} id - sku của product.
     * @returns {Promise<Product, APIError>}
     */
  get(id) {
    return this.findById(id)
      .exec()
      .then((product) => {
        if (product) {
          return product;
        }
        const err = new APIError('No such product exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  /**
     * Lấy danh sách product và sort theo 'dateAdded'.
     * @param {number} skip - Số lượng product sẽ bỏ qua khi lấy danh sách.
     * @param {number} limit - Giới hạn số lượng product sẽ trả lên.
     * @returns {Promise<Product[]>}
     */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ dateAdded: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};
// đặt tên cho collection
module.exports = mongoose.model('Product', ProductSchema);
