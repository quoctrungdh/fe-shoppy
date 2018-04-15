import * as React from 'react';
import { Link }   from 'react-router-dom';
import Cart       from '../component/Cart';

function Nav() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/products">Products</Link></li>
        </ul>
      </nav>
      <Cart />
    </header>    
  );
}

export default Nav;
