/*
* Module dependencies
*/
import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import $ from 'jquery';

import AccountActions from '../actions/AccountActions.jsx';

let AccountStore = Reflux.createStore({
  mixins         : [ StateMixin.store ],
  listenables    : [ AccountActions ],
  url            : 'http://localhost:7000/login',
  getInitialState: function() {},
  login          : function(data) {},
  logout         : function(){}
});

export default AccountStore;
