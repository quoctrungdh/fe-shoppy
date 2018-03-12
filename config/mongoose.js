const mongoose = require('mongoose');
const util = require('util');
const config = require('./config');
const debug = require('debug')('fe-shoppy:server/index');
// dùng mongoose để tương tác với cơ sở dữ liệu MongoDB
// link: https://github.com/Automattic/mongoose
// dùng bluebird để sử dụng promise cho mongoose
// link: https://github.com/petkaantonov/bluebird
mongoose.Promise = require('bluebird');
// connect tới cơ sở dữ liệu từ đường dẫn mặc định
// xem file config.js
mongoose.connect(config.mongo.mongoUri);
const db = mongoose.connection;
// listen các sự kiện của mongoose
db.on('connected', () => console.log('MongoDB connected!'));
db.on('error', err => console.log(`MongoDB error: ${err}`));
db.on('disconnect', () => console.log('MongoDB disconnected'));

// bật/tắt chế độ debug của mongoose
// dùng thư viện debug để log ra console
// link: https://github.com/visionmedia/debug
// xem file config.js
if (config.mongo.debug === true) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// tạo dữ liệu giả để test cho các collection Product và Color (sẽ bỏ sau khi làm xong phần admin của shoppy)
module.exports = function sampleData() {
  const Product = db.model('Product');

  Product.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const productList = [];

    for (let i = 1; i <= 50; i += 1) {
      productList.push(new Product({
        sku: `SP000${i}`,
        name: `Nike blue shoes-${i}`,
        categoryId: `CAT000${i}`,
        groupId: `GR000${i}`,
        colorId: `CL000${i}`,
        images: ['/static/images/shoes1.png', '/static/images/shoes2.png', '/static/images/shoes3.png', '/static/images/shoes4.png'],
        price: Math.floor(Math.random() * (10000000 - 10000 + 1) + 10000),
        sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        description: 'Nice shoe to choose',
        userAdded: 'Stephen Cheng',
      }));
    }

    Product.create(productList, (error) => {
      if (error) {
        console.log(error);
      }
    });
  });

  const Color = db.model('Color');

  Color.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const colorList = [
      {
        id: 'Color0001',
        name: 'red',
        hex: '#FF0000',
        userAdded: 'Stephen Cheng',
      },
      {
        id: 'Color0002',
        name: 'blue',
        hex: '#0000FF',
        userAdded: 'Stephen Cheng',
      },
      {
        id: 'Color0003',
        name: 'green',
        hex: '#008000',
        userAdded: 'Stephen Cheng',
      },
    ];


    Color.create(colorList, (error) => {
      if (error) {
        console.log(error);
      }
    });
  });
};
