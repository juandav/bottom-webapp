/*
* Module dependencies
*/
import Reflux from 'reflux';
import $ from 'jquery';
import StateMixin from 'reflux-state-mixin';
import MenuActions from '../actions/MenuActions.jsx';

let MenuStore = Reflux.createStore({
  mixins         : [ StateMixin.store ],
  listenables    : MenuActions,
  url            : 'http://localhost:7000/menu',
  getInitialState: function() {
    return{
      info: ''
    }
  },
  fetchMenu      : function() {
    $.ajax({
      type   : 'GET',
      url    : this.url,
      context: this
    })
    .done(function(data) {
      let info = JSON.stringify(data.payload);
      this.setState({ info: info });
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  },
  createMenu     : function(info) {
    $.ajax({
      type   : 'POST',
      data   : info,
      url    : this.url,
      context: this
    })
    .done(function(data) {
      this.fetchMenu();
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  },
  putMenu        : function() {},
  removeMenu     : function(data) {
    $.ajax({
      url: this.url + '/' + data._id,
      type: 'DELETE',
      context: this
    })
    .done(function(data) {
      this.fetchMenu();
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  }
});

export default MenuStore;
