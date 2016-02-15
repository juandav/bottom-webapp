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

import MenuContainer from './containers/content/MenuContainer.jsx';
import PageContainer from './containers/content/PageContainer.jsx';
import BlogContainer from './containers/content/BlogContainer.jsx';
import PostContainer from './containers/content/PostContainer.jsx';

const history = createBrowserHistory();
injectTapEventPlugin();

render((
 <Router history = { history } >
   <Route path='/' component={ Dashboard }>
     <Route path='login' component={ Account }/>
     <Route path="/menu" component={ MenuContainer } />
     <Route path="/page" component={ PageContainer } />
     <Route path="/blog" component={ BlogContainer } />
     <Route path="/post" component={ PostContainer } />
   </Route>
 </Router>
), document.getElementById('app'))


/*
// <IndexRoute component={ Account }/>
*/
