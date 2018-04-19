import * as React from 'react';
import { withRouter } from "react-router-dom";
import Agent from '../agent';
import authenService from '../authenService';

class GoogleLogin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			token: ''
		}
	}
	componentDidMount() {
		var e = document.createElement("script");
		e.type = "text/javascript";
		e.async = true;
		e.defer = true;
		e.src = 'https://apis.google.com/js/platform.js';
		var t = document.getElementsByTagName("script")[0];
		t.parentNode.insertBefore(e, t)
	}

	handleGoogleLogin = () => {
		const ggLoginResponse = Agent.Auth.loginGoogle();
		ggLoginResponse.signIn()
			.then((res) => {
				const userInfo = {
					name: ggLoginResponse.currentUser.get().getBasicProfile().getName(),
					imageUrl: ggLoginResponse.currentUser.get().getBasicProfile().getImageUrl()
				};
				this.handleGoogleLoginServer(res.getAuthResponse().id_token);
			})
			.catch((err) => {
				console.log(err.error);
			})
	}

	handleGoogleLoginServer(token) {
		// fetch('http://localhost:3000/api/auth/gg-login', {
		// 	body: JSON.stringify({token}), // must match 'Content-Type' header
		// 	headers: {
		// 		'content-type': 'application/json'
		// 	},
		// 	method: 'POST',
		// })
		// .then(res => res.json())
		// .then(data => {
		// 	authenService.setUserInfo(data.token);
		// 	this.props.history.push('/');
		// })
		// .catch(err => console.log(err));
		Agent.Auth
			.loginGoogleServer(token)
			.then(data => {
				authenService.setUserInfo(data.token);
				this.props.history.push('/');
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="g-signin2" onClick={this.handleGoogleLogin}></div>
		)
	}
}

export default withRouter(GoogleLogin);
