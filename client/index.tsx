import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';

import Nav from './common/Nav';
import Home from './routes/Home';
import About from './routes/About';
import NotFound from './routes/NotFound';
import Promotion from './routes/Promotion';

import './style.scss';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/promotion" component={Promotion} />
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
