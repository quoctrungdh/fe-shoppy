import * as React    from 'react';
import { Link }      from 'react-router-dom';
import authenService from '../authenService';
import Button        from '../fragments/Button';
import Cart          from '../component/Cart';
import { withRouter } from "react-router-dom";
import Agent from '../agent';

class Nav extends React.Component {
	constructor(props: object) {
		super(props);

		this.handleUserInfoChange = this.handleUserInfoChange.bind(this);
		this.state = {
			userInfo: {
				username: '',
				profilePicture: ''
			}
		}
	}

	componentDidMount() {
		this.handleUserInfoChange();
		authenService.subscribe(this.handleUserInfoChange);
	}

	componentWillUnmount() {
		authenService.unsubscribe(this.handleUserInfoChange);
	}

	// componentDidMount() {
	// 	this.handleUserInfoChange();
	// }

	doLogOut = () => {
		authenService.setUserInfo(null);
		this.props.history.push('/');
	}

	handleUserInfoChange = () => {
		const token = authenService.getUserInfo();
		Agent.Auth
			.getUser(token)
			.then(res => {
				return this.setState({
					userInfo: {
						username: res.username,
						profilePicture: res.profilePicture
					}
				})}
			);
	}

	render() {
		const token = authenService.getUserInfo();
		const { userInfo } = this.state;
		if (token) {
			return (
				<nav>
					<ul className="nav">
						<li className="nav__item"><Link to="/">Home</Link></li>
						<li className="nav__item"><Link to="/favorites">Favorites</Link></li>
						<li className="nav__item"><Link to="/about">About</Link></li>
						<li className="nav__item"><Link to="/user-profile">{userInfo.username}</Link></li>
						<li className="nav__item">
							<Button onClick={this.doLogOut}>Log out</Button>
						</li>
					</ul>
					<Cart />
				</nav>
			);
		}

		return (
			<nav>
				<ul className="nav">
					<li className="nav__item"><Link to="/">Home</Link></li>
					<li className="nav__item"><Link to="/login">Log In</Link></li>
					<li className="nav__item"><Link to="/register">Register</Link></li>
					<li className="nav__item"><Link to="/about">About</Link></li>
					<Cart />
				</ul>
			</nav>
		);
	}
};

export default withRouter(Nav);
