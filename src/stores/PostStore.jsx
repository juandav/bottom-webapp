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
  getInitialState: function() {
    return {
      post: ''
    };
  },
  fetchPost      : function() {
    $.ajax({
      type   : 'GET',
      url    : this.url,
      context: this
    })
    .done(function(data) {
      let info = JSON.stringify(data);
      this.setState({ post: info });
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  },
  createPost     : function() {},
  putPost        : function() {},
  removePost     : function() {}
});

export default PostStore;
