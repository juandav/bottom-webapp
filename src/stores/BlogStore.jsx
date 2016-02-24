/*
* Module dependencies
*/
import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import $ from 'jquery';

import BlogActions from '../actions/BlogActions.jsx';

let BlogStore = Reflux.createStore({
  mixins         : [ StateMixin.store ],
  listenables    : [ BlogActions ],
  url            : 'http://localhost:7000/blog',
  getInitialState: function() {
    return {
      blog: ''
    };
  },
  fetchBlog      : function() {
    $.ajax({
      type   : 'GET',
      url    : this.url,
      context: this
    })
    .done(function(data) {
      let info = JSON.stringify(data.payload);
      this.setState({ blog: info });
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  },
  createBlog     : function(init_data) {
    $.ajax({
      type   : 'POST',
      data   : init_data,
      url    : 'http://localhost:7000/blog',
      context: this
    })
    .done(function(over_data) {
      this.fetchBlog();
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  },
  putBlog        : function() {},
  removeBlog     : function(data) {
    $.ajax({
      url: 'http://localhost:7000/blog/' + data._id,
      type: 'DELETE',
      context: this
    })
    .done(function(data) {
      this.fetchBlog();
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  }
});

export default BlogStore;
