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
  getInitialState: function() {},
  fetchBlog      : function() {},
  createBlog     : function() {},
  putBlog        : function() {},
  removeBlog     : function() {}
});

export default BlogStore;
