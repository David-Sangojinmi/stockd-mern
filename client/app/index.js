import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Main from './components/Main/Main';
import AccountHome from './components/Account/AccountHome';
import SignUp from './components/Account/SignUp';

import './styles/styles.scss';
import './styles/color/default.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route path="/signin" component={AccountHome}/>
        <Route path="/signup" component={SignUp}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
