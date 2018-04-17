import * as React    from 'react';
import { Link }      from 'react-router-dom';
import authenService from '../authenService';
import Button        from '../fragments/Button';
import Cart          from '../component/Cart';

class Nav extends React.Component {
	constructor(props: object) {
		super(props);

		this.handleUserInfoChange = this.handleUserInfoChange.bind(this);
		this.state = {
			userInfo: authenService.getUserInfo()
		}
	}

	componentDidMount() {
		authenService.subscribe(this.handleUserInfoChange)
	}

	componentWillUnmount() {
		authenService.unsubscribe(this.handleUserInfoChange);
	}

	doLogOut = () => {
		authenService.setUserInfo(null);
	}

	handleUserInfoChange = () => {
		this.setState({
			userInfo: authenService.getUserInfo()
		})
	}

	render() {
		const { userInfo }: any = this.state;

		if (userInfo) {
			return (
				<nav>
					<ul className="nav">
						<li className="nav__item"><Link to="/">Home</Link></li>
						<li className="nav__item"><Link to="/favorites">Favorites</Link></li>
						<li className="nav__item"><Link to="/about">About</Link></li>
						<li className="nav__item"><Link to="#">{userInfo.name}</Link></li>
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

export default Nav;
