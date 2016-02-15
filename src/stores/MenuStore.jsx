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
  getInitialState: function() {
    return {
      menu: ''
    };
  },
  fetchMenu      : function() {
    $.ajax({
      type   : 'GET',
      url    : this.url,
      context: this
    })
    .done(function(data) {
      let info = JSON.stringify(data);
      this.setState({ menu: info });
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  },
  createMenu     : function(info) {
    $.ajax({
      type   : 'POST',
      data   : info,
      url    : this.url
    })
    .done(function(data) {
      console.log(data);
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  },
  putMenu        : function() {},
  removeMenu     : function() {
    $.ajax({
      url: 'http://localhost:7000/menu/' + data._id,
      type: 'DELETE'
    })
    .done(function(data) {
      console.log(data);
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  }
});

export default MenuStore;
