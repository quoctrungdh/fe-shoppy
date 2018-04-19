import * as React from 'react';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';

import Agent from '../agent';
import authenService from '../authenService';

import Input from '../fragments/Input';
import Button from '../fragments/Button';
import ErrorMessage from '../fragments/ErrorMessage';
// import GoogleLogin from 'react-google-login';
import GoogleLogin from '../fragments/GoogleLogin';

interface LoginProp {
	values: {
		email: string,
		username: string,
		password: string,
		passwordConfirm: string
	},
	handleChange(): void,
	handleBlur(): void,
	errors: {
		message: string
	},
	handleSubmit(): void,
	touched: {
		email: string,
	}
}

function SocialLogin() {
	return (
		<ul className="socialLogin">
			<li className="socialLogin__item">
				<GoogleLogin />
			</li>
		</ul>
	);
}

function LogInInnerForm({
	values, handleChange, handleBlur, errors, handleSubmit,
}: LoginProp) {
	return (
		<form className="loginForm" onSubmit={handleSubmit}>
			<Input
				type="email"
				name="email"
				value={values.email}
				onChange={handleChange}
				placeholder="Email"
			/>
			<Input
				type="password"
				name="password"
				value={values.password}
				onChange={handleChange}
				placeholder="Password"
			/>
			<Link to="/password-recover">FORGOT YOUR PASSWORD</Link>
			<Button>
				LOG IN
			</Button>
			{
				errors &&
				<ErrorMessage>{errors.message}</ErrorMessage>
			}
		</form>
	);
}

const LogInForm = withFormik({
	mapPropsToValues: () => ({
		email: '',
		password: '',
	}),
	handleSubmit: (loginInfo, { props, setErrors }) => {
		const { location, history }: any = props;
		const { state } = location;
		const referrerRoute = state && state.from ? state.from : '/';

		Agent.Auth
			.login(loginInfo)
			.then((data) => {
				authenService.setUserInfo(data.token);
				history.push(referrerRoute);
			})
			.catch((err: object) => { setErrors(err); });
	},
})(LogInInnerForm);

function LogIn({ history, location }: any) {
	return (
		<section className="login">
			<h1>SHOPPY</h1>
			<LogInForm history={history} location={location} />
			<SocialLogin />
			<p>STILL HAVEN&apos;T AN ACCOUNT</p>
			<Link to="/register">REGISTER NOW</Link>
		</section>
	);
}

export default LogIn;
