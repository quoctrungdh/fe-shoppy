
import * as React from 'react';
import * as ReactDOM from 'react-dom'	;
import { BrowserRouter, Switch, Route, RouteComponentProps, Redirect, Router } from 'react-router-dom';

import Nav from './common/Nav';
import Home from './routes/Home';
import LogIn from './routes/LogIn';
import Register from './routes/Register';
import About from './routes/About';
import Favorites from './routes/Favorites';
import ProductListSimple from './routes/ProductList.Simple';
import NotFound from './routes/NotFound';
import Promotions from './routes/Promotions/Promotions';
import ProductDetail from './routes/ProductDetail/productDetail';


import './style/index.scss';

import authenService from './authenService';


const UnAuthRoute = ({ component: Component, ...rest }: any) => {
	const userInfo = authenService.getUserInfo();

	return (
		<Route
			{...rest}
			render={(props) => userInfo ? (
				<Redirect
					to={{
						pathname: '/',
						state: { from: props.location }
					}}
				/>
			) : (<Component {...props} />)}
		/>
	);
};

const AuthRoute = ({ component: Component, ...rest }: any) => {
	const userInfo = authenService.getUserInfo();
	return (
		<Route
			{...rest}
			render={(props) => userInfo ? (<Component {...props} />)
			: (<Redirect
					to={{
						pathname: '/login',
						state: { from: props.location }
					}}
				/>)
			}
		/>
	);
};

ReactDOM.render(
	<BrowserRouter>
		<div>
			<Nav />
			<Switch>
				<Route exact path="/" component={Home} />
				<UnAuthRoute path="/login" component={LogIn} />
				<UnAuthRoute path="/register" component={Register} />
				<AuthRoute path="/favorites" component={Favorites} />
				<Route path="/about" component={About} />
				<Route path="/promotions" component={Promotions} />
				<Route path="/products" component={ProductListSimple} />
				<Route path="/product-detail/:id" component={ProductDetail} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</BrowserRouter>,
	document.getElementById('root'),
);


/**
 * TODO: ESLINT
 * REDUX
 * STORY-BOOK
 * UNIT TEST
 */
