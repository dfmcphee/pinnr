import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import App from './app.js';
import Index from './components/index/index.js';
import Groups from './components/groups/groups.js';
import Group from './components/group/group.js';
import Create from './components/create/create.js';
import Signup from './components/signup/signup.js';
import Login from './components/login/login.js';
import NoMatch from './components/no-match/no-match.js';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/add" component={Create} />
      <Route path="/groups" component={Groups} />
      <Route path="/group/:groupId" component={Group}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('root'))
