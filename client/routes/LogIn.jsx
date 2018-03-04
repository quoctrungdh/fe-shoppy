import React from 'react';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';

import Agent from '../agent';
import authenService from '../authenService';

import Input from '../fragments/Input';
import Button from '../fragments/Button';
import ErrorMessage from '../fragments/ErrorMessage';

function SocialLogin() {
  return (
    <ul className="socialLogin">
      <li className="socialLogin__item">FB</li>
      <li className="socialLogin__item">Ins</li>
      <li className="socialLogin__item">Tw</li>
      <li className="socialLogin__item">VK</li>
    </ul>
  );
}

function LogInInnerForm({
  values, handleChange, handleBlur, errors, handleSubmit,
}) {
  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Username"
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
    const { location, history } = props;
    const { state } = location;
    const referrerRoute = state && state.from ? state.from : '/';

    Agent.Auth
      .login(loginInfo)
      .then((userInfo) => {
        authenService.setUserInfo(userInfo);
        history.push(referrerRoute);
      })
      .catch((err) => { setErrors(err); });
  },
})(LogInInnerForm);

function LogIn({ history, location }) {
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
