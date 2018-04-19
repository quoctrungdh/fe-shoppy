import * as React from 'react';
import authenService from '../authenService';
import Slider from 'react-slick';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import Input from '../fragments/Input';
import Button from '../fragments/Button';
import ErrorMessage from '../fragments/ErrorMessage';
import EditForm  from '../routes/EditForm';

import Agent from '../agent';

import * as defaultImge from '../assets/images/avatar.png';

// interface Editprop {
// 	values: {
// 		username: string,
// 		phone: string,
// 		address: string
// 	},
// 	handleChange(): void,
// 	handleBlur(): void,
// 	errors: {
// 		message: string
// 	},
// 	handleSubmit(): void,
// 	touched: {
// 		email: string,
// 	}
// }

// const EditInnerForm = (props) => {
// 	const {
// 		values, handleChange, handleBlur, errors, handleSubmit, touched
// 	}: Editprop = props;
// 	return (
// 		<form className="loginForm" onSubmit={handleSubmit}>
// 			<Input
// 				type="text"
// 				name="username"
// 				value={values.username}
// 				onChange={handleChange}
// 				placeholder="Enter Your Username"
// 			/>
// 			{ touched.username && errors.username && <ErrorMessage>{errors.username}</ErrorMessage> }
// 			<Input
// 				type="text"
// 				name="phone"
// 				value=""
// 				onChange={handleChange}
// 				placeholder="Enter your phone number"
// 			/>
// 			{ touched.phone && errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage> }
// 			<Input
// 				type="text"
// 				name="address"
// 				value=""
// 				onChange={handleChange}
// 				placeholder="Enter your address"
// 			/>
// 			{ touched.address && errors.address && <ErrorMessage>{errors.address}</ErrorMessage> }
// 			<Button>
// 				SAVE
// 			</Button>
// 			{
// 				errors &&
// 				<ErrorMessage>{errors.message}</ErrorMessage>
// 			}
// 		</form>
// 	);
// }

// const EditProfileForm = withFormik({
// 	mapPropsToValues: () => ({
// 		username: '',
// 		phone: '',
// 		address: ''
// 	}),
// 	validationSchema: Yup.object().shape({
// 		username: Yup.string().required('Username is required'),
// 		phone: Yup.number().required('Phone number is required'),
// 		address: Yup.string().required('Address is required')
// 	}),
// 	handleSubmit: (editInfo, { props, setErrors }) => {
// 		const { location, history }: any = props;
// 		const { state } = location;
// 		const referrerRoute = state && state.from ? state.from : '/';
// 		console.log(state)
//
// 		// Agent.Auth
// 		// 	.login(loginInfo)
// 		// 	.then((data) => {
// 		// 		authenService.setUserInfo(data.token);
// 		// 		history.push(referrerRoute);
// 		// 	})
// 		// 	.catch((err: object) => { setErrors(err); });
// 	},
// })(EditForm);

function EditProfile({ history, location }: any) {
	return (
		<section className="login">
			<h1>Edit Profile</h1>
			<EditForm history={history} location={location} />
		</section>
	);
}

export default EditProfile;
