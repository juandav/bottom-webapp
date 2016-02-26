'use strict';
/*
* Module dependencies
*/
import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Menu from '../components/menu/menu.jsx';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import BackupExport from '../components/BackupExport.jsx';

import "./container.css";

const style = {
  position: 'fixed',
  top     : 0,
  left    : 0,
  right   : 0,
  background: '#37474F'
};

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

   handleExportData() {

   }

  render() {
    return (
      <div id="dashboard">
        <AppBar
          title="InstaCash"
          style={style}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="manage account"/>
              <BackupExport/>
              <MenuItem primaryText="logout" />
            </IconMenu>
          }
          onLeftIconButtonTouchTap={ this._changeState.bind(this) }>
          <Menu click={ true } history={ this.props.history }/>
        </AppBar>
        <div id="content" className="content">
          { this.props.children }
        </div>
      </div>
    )
  }
}
