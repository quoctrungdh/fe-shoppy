const baseURL = 'http://localhost:12346';

interface RequestParams {
	url: string,
	body: any,
	username: string,
	email: string,
	password: string,
	passwordConfirm: string
}

const { fetch } = window;

const request = {
	get: (url: RequestParams) => fetch(baseURL + url, {
		method: 'get',
	}),
	post: ({url, body}: RequestParams) => fetch(baseURL + url, {
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
	register: ({username, email, password}: RequestParams) => request.post('/users', { user: { username, email, password } }),
	// login: user => request.post('/users/login', user),
	login: ({ email, password }: RequestParams) => {
		if (email === 'admin@shoppy.com' && password === 'admin') {
			const userInfo = {
				name: 'shoppy',
				role: 'admin',
			};

			return Promise.resolve(userInfo);
		}
		return Promise.reject(new Error('Auth failed'));
	},
	loginGoogle: () => {
		return gapi.auth2.getAuthInstance();
	}
};

const Product = {
	getProductDetails(productId :string) {
		return request.get('/products')
			.then(data => data.json())
			.then(data => data[productId])
	}
}

export default {
	Auth,
	Product
};

// https://github.com/gothinkster/react-redux-realworld-example-app/blob/master/src/agent.js
