const baseURL = 'http://localhost:3000/';

const { fetch } = window;

const request = {
  get: url => fetch(baseURL + url, {
    method: 'get',
  }),
  post: (url, body) => fetch(baseURL + url, {
    method: 'post',
    body: JSON.stringify(body),
  }),
  // put: (url) => {

  // },
  // del: (url) => {

  // },
};
// https://css-tricks.com/importance-javascript-abstractions-working-remote-data/
// https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript

const Auth = {
  register: (username, email, password) => request.post('/users', { user: { username, email, password } }),
  // login: user => request.post('/users/login', user),
  login: ({ email, password }) => {
    if (email === 'admin@shoppy.com' && password === 'admin') {
      const userInfo = {
        name: 'shoppy',
        role: 'admin',
      };

      return Promise.resolve(userInfo);
    }
    return Promise.reject(new Error('Auth failed'));
  },
};


export default {
  Auth,
};

// https://github.com/gothinkster/react-redux-realworld-example-app/blob/master/src/agent.js
