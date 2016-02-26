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
      let info = JSON.stringify(data.payload);
      this.setState({ post: info });
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  },
  createPost     : function(init_data) {
    console.log(init_data);
    $.ajax({
      type   : 'POST',
      data   : init_data,
      headers: {
        "Content-Type" : 'application/x-www-form-urlencoded',
        "Authorization": localStorage.getItem("token")
      },
      url    : 'http://localhost:7000/post',
      context: this
    })
    .done(function(over_data) {
      this.fetchPost();
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  },
  putPost        : function() {},
  removePost     : function(data) {
    $.ajax({
      url: 'http://localhost:7000/post/' + data._id,
      type: 'DELETE',
      context: this
    })
    .done(function(data) {
      this.fetchPost();
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  }
});

export default PostStore;
