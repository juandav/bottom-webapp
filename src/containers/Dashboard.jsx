'use strict';
/*
* Module dependencies
*/
import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Menu from '../components/menu/menu.jsx';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      click: false
    };
  }

  _changeState(){
     this.setState({
       click: !this.state.click
     });
   }

  render() {
    return (
      <AppBar
        title="InstaCash"
        onLeftIconButtonTouchTap={ this._changeState.bind(this) }>
        <Menu click={ true } history={ this.props.history }/>
      </AppBar>
    )
  }
}
