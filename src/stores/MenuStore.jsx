/*
* Module dependencies
*/
import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import $ from 'jquery';

import MenuActions from '../actions/MenuActions.jsx';

let MenuStore = Reflux.createStore({
  mixins         : [ StateMixin.store ],
  listenables    : [ MenuActions ],
  url            : 'http://localhost:7000/menu',
  getInitialState: function() {},
  fetchMenu      : function() {},
  createMenu     : function() {},
  putMenu        : function() {},
  removeMenu     : function() {}
});

export default MenuStore;
