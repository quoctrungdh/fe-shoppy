const baseURL = 'http://localhost:3000/';

interface RequestParams {
	url: string,
	body: any,
	username: string,
	email: string,
	password: string,
	passwordConfirm: string,
	token: string
}

const { fetch } = window;

const catchError = (data) => {
	if (data.auth) {
		return data;
	}
	throw new Error(data.message);
}

const parseJSON = (res) => {
	return res.json();
}

const request = {
	get: ({ url, token }: RequestParams) => {
		return fetch(baseURL + url, {
			method: 'get',
			headers: {
				'x-access-token': token
			}
		})
		.then(res => res.json())
	},
	post: ({url, body}: RequestParams) => {
		return fetch(baseURL + url, {
			method: 'post',
			body: JSON.stringify(body),
			headers: {
				'content-type': 'application/json'
			},
		})
		.then(parseJSON)
		.then(catchError)
	},
	// put: (url) => {

	// },
	// del: (url) => {

	// },
};
// https://css-tricks.com/importance-javascript-abstractions-working-remote-data/
// https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript

const Auth = {
	register: ({username, email, password}: RequestParams) => request.post({
		url: 'api/auth/register',
		body: { username, email, password },
	}),
	login: ({ email, password }: RequestParams) => request.post({
		url: 'api/auth/login',
		body: { email, password }
	}),
	getUser: (token: string) => request.get({
		url: 'api/auth/me',
		token: token
	}),
	loginGoogle: () => {
		return gapi.auth2.getAuthInstance();
	},
	loginGoogleServer: (token) => request.post({
		url: 'api/auth/gg-login',
		body: {token}
	})
};


export default {
	Auth,
	request
};

// https://github.com/gothinkster/react-redux-realworld-example-app/blob/master/src/agent.js
