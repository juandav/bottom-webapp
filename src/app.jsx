/*
* Module dependencies
*/
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Account from './containers/Account.jsx';
import Dashboard from './containers/Dashboard.jsx';
import Landing from './containers/Landing.jsx';

const history = createBrowserHistory();
injectTapEventPlugin();

render((
 <Router history = { history } >
   <Route path='/' component={ Dashboard }>
     <Route path='login' component={ Account }/>
     <Route path='dashboard' component={ Dashboard }/>
   </Route>
 </Router>
), document.getElementById('app'))


/*
// <IndexRoute component={ Account }/>
*/
