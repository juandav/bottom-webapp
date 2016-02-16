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
  getInitialState: function() {
    return{
      info: ''
    }
  },
  fetchMenu      : function() {
    $.ajax({
      type   : 'GET',
      url    : 'http://localhost:7000/menu',
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
      url    : 'http://localhost:7000/menu',
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

/*
let MenuStore = Reflux.createStore({
  mixins         : [ StateMixin.store ],
  listenables    : [ MenuActions ],
  url            : 'http://localhost:7000/menu',
  getInitialState: function() {
    return {
      info: '1'
    }
  },
  fetchMenu      : function() {

    $.ajax({
      type   : 'GET',
      url    : 'http://localhost:7000/menu',
      context: this
    })
    .done(function(data) {
      let info = JSON.stringify(data);
      this.setState({ menu: '2' });
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
*/
// export default MenuStore;
