import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import App from './app.js';
import Hello from './components/hello/hello.js';
import Groups from './components/groups/groups.js';
import Group from './components/group/group.js';
import NoMatch from './components/no-match/no-match.js';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Hello} />
      <Route path="groups" component={Groups} />
      <Route path="/group/:groupId" component={Group}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('root'))
