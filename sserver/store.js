const store = {};

const storeHandler = {
  store: {},
  get: id => store[id],
  set: (id, data) => {
    store[id] = data;
    return Promise.resolve(data);
  },
};

module.exports = storeHandler;
