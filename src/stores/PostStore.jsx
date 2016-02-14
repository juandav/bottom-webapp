/*
* Module dependencies
*/
import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import $ from 'jquery';

import PostActions from '../actions/PostActions.jsx';

let PostStore = Reflux.createStore({
  mixins         : [ StateMixin.store ],
  listenables    : [ PostActions ],
  url            : 'http://localhost:7000/post',
  getInitialState: function() {},
  fetchPost      : function() {},
  createPost     : function() {},
  putPost        : function() {},
  removePost     : function() {}
});

export default PostStore;
