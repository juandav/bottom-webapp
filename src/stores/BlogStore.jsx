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
  url            : 'localhost:7000/blog',
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
  createBlog     : function() {},
  putBlog        : function() {},
  removeBlog     : function() {}
});

export default BlogStore;
