'use strict';
import React         from 'react';
import { connector } from 'reflux-state-mixin';
import BackupStore   from '../stores/BackupStore.jsx';
import BackupActions from '../actions/BackupActions.jsx';

import MenuItem from 'material-ui/lib/menus/menu-item';

// import download   from '../lib/download.jsx';

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

    let file = new Blob([this.state.backup], {type: "application/json"});
    let url = URL.createObjectURL(file);
    let a = document.createElement("a");

		a.href = url;
		a.download = "backup.json";
    a.click();

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
