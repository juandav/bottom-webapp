import React, { Component } from 'react';
import MenuStore            from '../../stores/MenuStore.jsx';
import MenuActions          from '../../actions/MenuActions.jsx';
import { connector }          from 'reflux-state-mixin';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/remove';

import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

@connector(MenuStore)
export default class MenuContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  componentDidMount() {
    MenuActions.fetchMenu();
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleCreate() {
    const title = this.refs.title;
    MenuActions.createMenu({ title: title.getValue().trim() });
    this.setState({ open: false });
  }

  _removeRow(row) {
    MenuActions.removeMenu(row);
  }

  render() {
    if(this.state.info) {
      const actions = [
        <FlatButton label="Cancel" secondary={ true } onTouchTap={ this.handleClose.bind(this) }/>,
        <FlatButton label="Create" primary={ true } onTouchTap={ this.handleCreate.bind(this) }/>
      ];
      return (
        <div>
          <RaisedButton label="Create Menu" primary={true} onTouchTap={ this.handleOpen.bind(this) }/>
          <Dialog
            title='Create new menu'
            actions={actions}
            modal={true}
            open={this.state.open}>

            <TextField ref='title' hintText='write the title of the menu' floatingLabelText='Title' />
          </Dialog>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn>Delete</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody>
              { JSON.parse(this.state.info).map((row, index) => (
                <TableRow key={index} selected={ false }>
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.title}</TableRowColumn>
                  <TableRowColumn>
                    <FloatingActionButton mini={true} onClick={ this._removeRow.bind(this, row) } >
                      <ContentAdd />
                    </FloatingActionButton>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    }

    return (
      <h1> Content Menu </h1>
    )
  }
}
