/*
* Module dependencies
*/
import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import $ from 'jquery';

import BackupActions from '../actions/BackupActions.jsx';

let BackupStore = Reflux.createStore({
  mixins         : [ StateMixin.store ],
  listenables    : [ BackupActions ],
  url            : 'http://localhost:7000/backup',
  getInitialState: function() {
    return {
      backup: ''
    };
  },
  exportDB      : function() {
    $.ajax({
      type   : 'GET',
      url    : this.url,
      context: this
    })
    .done(function(data) {
      let info = JSON.stringify(data.payload);
      this.setState({ backup: info });
    })
    .fail(function(err) {
      console.log('Error loading data: ' + err);
    });
  },
  importDB        : function() {}
});

export default BackupStore;
