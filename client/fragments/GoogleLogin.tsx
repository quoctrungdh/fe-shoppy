import * as React from 'react';
import { withRouter } from "react-router-dom";
import Agent from '../agent';
import authenService from '../authenService';

class GoogleLogin extends React.Component {
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
			.then(() => {
				const userInfo = {
					name: ggLoginResponse.currentUser.get().getBasicProfile().getName(),
					role: 'customer'
				}
				this.props.history.push('/');
				authenService.setUserInfo(userInfo);
			})
			.catch((err) => {
				alert(err.error);
			})
	}

	render() {
		return (
			<div className="g-signin2" onClick={ () => this.handleGoogleLogin() }></div>
		)
	}
}

export default withRouter(GoogleLogin);
