'use strict';
/*
* Module dependencies
*/
import React, { Component } from 'react';
import AuthActions from '../actions/AccountActions.jsx';
import AuthStores from '../stores/AccountStore.jsx';
import { Paper, TextField, RaisedButton } from 'material-ui';

const style = {
  height   : 250,
  width    : 300,
  margin   : 20,
  textAlign: 'center',
  display  : 'inline-block'
};

export default class Account extends Component {

  _handleClick(e) {
    const username = this.refs.username;
    const password = this.refs.password
    // console.log(this);

    const creds = {
      username: username.getValue().trim(),
      password: password.getValue().trim()
    };

    AuthActions.login(creds, this.props.history);

    // let token = localStorage.getItem("token");

  }

  render() {
    return (
      <div className='centrado-porcentual'>
        <Paper zDepth={4} rounded={false} className='login' style={style}>
          <TextField
            hintText='Enter your username'
            floatingLabelText='Username'
            ref='username'
          />
          <TextField
            hintText='Enter your password'
            floatingLabelText='Password'
            type='password'
            ref='password'
          />
          <RaisedButton
            label='Log In'
            onClick={this._handleClick.bind(this)}
          />
        </Paper>
      </div>
    );
  }
}
