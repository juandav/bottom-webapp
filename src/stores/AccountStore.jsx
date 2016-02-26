/*
* Module dependencies
*/
import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import $ from 'jquery';

import AccountActions from '../actions/AccountActions.jsx';

let AccountStore = Reflux.createStore({
  mixins         : [ StateMixin.store ],
  listenables    : AccountActions,
  url            : 'http://localhost:7000/login',
  getInitialState: function() {},
  login          : function(info) {
    $.ajax({
      type: 'POST',
      url : this.url,
      data: info.creds
    })
    .done(function(data) {
      localStorage.setItem("token", data.payload.token);
      console.log(data.payload.token);
      console.log(info.history);
      info.history.push('dashboard');
    })
    .fail(function(err) {
      console.log('err');
      localStorage.setItem("token", "");
    });
  },
  logout         : function(){
    localStorage.setItem("token", "");
    info.history.push('login');
  }
});

export default AccountStore;
