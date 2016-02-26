'use strict';
import React         from 'react';
import { connector } from 'reflux-state-mixin';
import BackupStore   from '../stores/BackupStore.jsx';
import BackupActions from '../actions/BackupActions.jsx';

import MenuItem from 'material-ui/lib/menus/menu-item';

import * as download   from '../lib/download.js';

const style = {
  margin: 12,
};

@connector(BackupStore)
export default class BackupExport extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  componentDidMount() {
    BackupActions.exportDB();
  }

  handleClick() {
    console.log(download);
    // download(this.state.backup, "backup.txt", "text/plain");
  }

  render() {
    return (
      <MenuItem primaryText="export data" onTouchTap={this.handleClick.bind(this)} />
    );
  }
}

/*
<RaisedButton label="Export Data" style={style} onTouchTap={this.handleClick.bind(this)}/>
*/
