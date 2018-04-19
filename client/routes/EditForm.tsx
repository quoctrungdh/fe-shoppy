import * as React from 'react';
import authenService from '../authenService';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Agent from '../agent';

import Input from '../fragments/Input';
import Button from '../fragments/Button';
import ErrorMessage from '../fragments/ErrorMessage';

interface Editprop {
	values: {
		username: string,
		phone: string,
		address: string
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

function EditInnerForm({
	values, handleChange, handleBlur, errors, handleSubmit, touched
}: Editprop) {
	return (
		<form className="loginForm" onSubmit={handleSubmit}>
			<Input
				type="text"
				name="username"
				value={values.username}
				onChange={handleChange}
				placeholder="Enter Your Username"
			/>
			{ touched.username && errors.username && <ErrorMessage>{errors.username}</ErrorMessage> }
			<Input
				type="text"
				name="phone"
				value={values.phone}
				onChange={handleChange}
				placeholder="Enter your phone number"
			/>
			{ touched.phone && errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage> }
			<Input
				type="text"
				name="address"
				value={values.address}
				onChange={handleChange}
				placeholder="Enter your address"
			/>
			{ touched.address && errors.address && <ErrorMessage>{errors.address}</ErrorMessage> }
			<Button>
				SAVE
			</Button>
			{
				errors &&
				<ErrorMessage>{errors.message}</ErrorMessage>
			}
		</form>
	);
}

const EditProfileForm = withFormik({
	mapPropsToValues: (props) => {
		return {
			username: props.username,
			phone: '',
			address: ''
		}
	},
	validationSchema: Yup.object().shape({
		username: Yup.string().required('Username is required'),
		phone: Yup.number().required('Phone number is required'),
		address: Yup.string().required('Address is required'),
	}),
	handleSubmit: (editInfo, { props, setErrors }) => {
		const { location, history }: any = props;
		const { state } = location;
		const referrerRoute = state && state.from ? state.from : '/';

		// Agent.Auth
		// 	.login(loginInfo)
		// 	.then((data) => {
		// 		authenService.setUserInfo(data.token);
		// 		history.push(referrerRoute);
		// 	})
		// 	.catch((err: object) => { setErrors(err); });
	},
})(EditInnerForm);

class EditForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
		}
	}

	componentDidMount() {
		const token = authenService.getUserInfo();
		Agent.Auth
			.getUser(token)
			.then(res => {
				return this.setState({
					username: res.username,
				})
			});
	}

	render() {
		const { username } = this.state;
		return (
			<EditProfileForm username={username}/>
		)
	}
}

export default EditForm;
