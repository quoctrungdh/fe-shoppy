import React from 'react';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import Yup from 'yup';

import Agent from '../agent';
import authenService from '../authenService';

import Input from '../fragments/Input';
import Button from '../fragments/Button';
import ErrorMessage from '../fragments/ErrorMessage';

function RegisterInnerForm({
  values, handleChange, handleBlur, errors, handleSubmit, touched
}) {
  return (
    <form className="registerForm" onSubmit={handleSubmit}>
      <Input
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        placeholder="Username"
      />
      { touched.email && errors.username && <ErrorMessage>{errors.username}</ErrorMessage> }
      <Input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      { touched.email && errors.email && <ErrorMessage>{errors.email}</ErrorMessage> }
      <Input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
      />
      { touched.email && errors.password && <ErrorMessage>{errors.password}</ErrorMessage> }
      <Input
        type="password"
        name="passwordConfirm"
        value={values.passwordConfirm}
        onChange={handleChange}
        placeholder="Confirm Password"
      />
      { touched.email && errors.passwordConfirm && <ErrorMessage>{errors.passwordConfirm}</ErrorMessage> }
      <Button>
        REGISTER
      </Button>
    </form>
  );
}

const RegisterForm = withFormik({
  mapPropsToValues: () => ({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email("Email isn't valid").required('Email is required!'),
    password: Yup.string()
      .min(9, 'Password must be 9 characters or longer')
      .matches(/[a-z]/, 'at least one lowercase characters')
      .matches(/[A-Z]/, 'at least one uppercase characters')
      .matches(/[a-zA-Z]+[^a-zA-Z\s]/, 'at least 1 number or special characters')
      .required('Password is required!'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], "password don't match")
      .required('Password confirm is required')
  }),
  handleSubmit: (registerInfo, { props, setErrors }) => {
    const { history } = props;

    Agent.Auth
      .register(registerInfo)
      .then(() => {
        history.push('/login');
      })
      .catch((err) => { setErrors(err); });
  }
})(RegisterInnerForm)


function Register({ history, location }) {
  return (
    <section className="register">
      <h1>SHOPPY</h1>
      <RegisterForm history={history} location={location} />
      <Link to="/login">LOGIN NOW</Link>
    </section>
  )
}

export default Register;
