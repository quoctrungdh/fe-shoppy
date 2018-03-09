
export function getProducts(): any {
  return fetch('http://demo5922516.mockable.io/shoppy/products', {
    method: 'get'
  }).then(res => {
    return res.json();
  });
}