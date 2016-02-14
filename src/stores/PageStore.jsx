/*
* Module dependencies
*/
import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import $ from 'jquery';

import PageActions from '../actions/PageActions.jsx';

let PageStore = Reflux.createStore({
  mixins         : [ StateMixin.store ],
  listenables    : [ PageActions ],
  url            : 'http://localhost:7000/page',
  getInitialState: function() {},
  fetchPage      : function() {},
  createPage     : function() {},
  putPage        : function() {},
  removePage     : function() {}
});

export default PageStore;
