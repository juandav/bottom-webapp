/*
* Module dependencies
*/
import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import $ from 'jquery';

import PageActions from '../actions/PageActions.jsx';

let PageStore = Reflux.createStore({
  mixins         : [ StateMixin.store ],
  listenables    : PageActions,
  url            : 'http://localhost:8080/page',
  getInitialState: function() {
    return {
      page: ''
    };
  },
  fetchPage      : function() {
    $.ajax({
      type   : 'GET',
      url    : 'http://localhost:7000/page',
      context: this
    })
    .done(function(data) {
      let info = JSON.stringify(data.payload);
      this.setState({ page: info});
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  },
  createPage     : function(data) {
    $.ajax({
      type   : 'POST',
      data   : data,
      url    : 'http://localhost:7000/page',
      context: this
    })
    .done(function(overData) {
      this.fetchPage();
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  },
  putPage        : function() {},
  removePage     : function(data) {
    $.ajax({
      url: 'http://localhost:7000/page/' + data._id,
      type: 'DELETE',
      context: this
    })
    .done(function(data) {
      this.fetchPage();
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  }
});

export default PageStore;


/*

$.ajax({
  type   : 'POST',
  data   : data,
  url    : 'http://localhost:7000/menu',
  context: this
})
.done(function(result) {
  this.fetchMenu();
})
.fail(function(err) {
  console.log('Error loading data: ' + err);
});

*/
