

export {
  getProducts,
  getPromotions
}

function getProducts(): any {
  return fetch('http://demo5922516.mockable.io/shoppy/products', {
    method: 'get'
  }).then(res => {
    return res.json();
  });
}

function getPromotions(): any {
  return fetch('http://demo5922516.mockable.io/promotions', {
    method: 'get'
  }).then(res => res.json());
}