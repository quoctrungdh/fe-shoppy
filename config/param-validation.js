const Joi = require('joi');
// dùng thư viện joi để validate các schema của mongoose
// link: https:// github.com/hapijs/joi
module.exports = {
  createProduct: {
    body: {
      name: Joi.string().required(),
      price: Joi.string().regex(/^([+-]?[1-9]\d*|0)$/).required(),
    },
  },

  updateProduct: {
    body: {
      name: Joi.string().required(),
      price: Joi.string().regex(/^([+-]?[1-9]\d*|0)$/).required(),
    },
    params: {
      sku: Joi.string().hex().required(),
    },
  },
};
