import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import './style.scss';

function Home() {
	return <h1>Home</h1>
}

function About() {
	return <h1>About</h1>
}

function NotFound() {
	return <h1>NotFound</h1>
}

function Nav() {
	return <nav>
		<ul>
			<li><Link to='/'>Home</Link></li>
			<li><Link to='/about'>About</Link></li>
		</ul>
	</nav>
}

function App() {
	return <div>
		<Nav />
		 <Switch>
			<Route exact path='/' component={Home} />
			<Route path='/about' component={About} />
			<Route component={NotFound} />
		</Switch>
	</div>
}

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
)


/**
 * TODO: ESLINT
 * REDUX
 * STORY-BOOK
 * UNIT TEST
 */
