import React from 'react';
import { Link } from 'react-router-dom';

import authenService from '../authenService';

import Button from '../fragments/Button';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.unsubscribe = authenService.subscribe(this.forceUpdate.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  doLogOut = () => {
    authenService.setUserInfo(null);
  }

  render() {
    const userInfo = authenService.getUserInfo();

    if (userInfo) {
      return (
        <nav>
          <ul className="nav">
            <li className="nav__item"><Link to="/">Home</Link></li>
            <li className="nav__item"><Link to="/favorites">Favorites</Link></li>
            <li className="nav__item"><Link to="/about">About</Link></li>
            <li className="nav__item">
              <Button onClick={this.doLogOut}>Log out</Button>
            </li>
          </ul>
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
        </ul>
      </nav>
    );
  }
};

export default Nav;
