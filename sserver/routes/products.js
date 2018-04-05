const express = require('express');
const faker = require('faker');
const storeHandler = require('../store');

const router = express.Router();

const getSizes = mockNumber => [...Array(mockNumber)].map(() => (
  faker.random.arrayElement([35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50])
));

const getColor = mockNumber => [...Array(mockNumber)].map(() => ({
  imageUrl: 'https://source.unsplash.com/640x480/?shoes-nike,shoes-adidas',
  color: faker.commerce.color(),
}));

function createProductMock(mockNumber) {
  const mock = [...Array(mockNumber)].map((_, idx) => ({
    productId: `P00${idx + 1}`,
    name: faker.commerce.productName(),
    description: faker.random.words(),
    isFavorite: faker.random.boolean(),
    price: faker.commerce.price(),
    sizes: getSizes(faker.random.arrayElement([2, 3, 4, 5, 6, 7])),
    colors: getColor(faker.random.arrayElement([2, 3, 4, 5, 6, 7])),
  }));

  return mock;
}

function getAllProduct(req, res) {
  const products = storeHandler.get('products');

  if (products) {
    return res.status(200).json(products);
  }

  const mock = createProductMock(500);

  storeHandler.set(mock);

  return res.status(200).json(mock);
}

function getProductById(req, res) {
  const products = storeHandler.get('products');
  const productId = req.body.query.id;

  if (!products) {
    const mock = createProductMock(500);
    storeHandler.set(mock);

    return res.status(404).json({ text: 'product not found' });
  }

  const product = products.find(p => p.productId === productId);
  if (product) {
    return res.status(200).json(product);
  }

  return res.status(404).json({ text: 'product not found' });
}


router.get('/', getAllProduct);
router.get('/:id', getProductById);

module.exports = router;

/*
 TODO: Add post, put , delete
*/
