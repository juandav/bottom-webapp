import React, { Component } from 'react';
import PageStore            from '../../stores/PageStore.jsx';
import PageActions          from '../../actions/PageActions.jsx';
import { connector }        from 'reflux-state-mixin';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

@connector(PageStore)
export default class PageContainer extends Component {

  componentDidMount() {
    PageActions.fetchPage();
  }

  render() {
    if(this.state.page) {
      return (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>index</TableHeaderColumn>
                <TableHeaderColumn>body</TableHeaderColumn>
                <TableHeaderColumn>label</TableHeaderColumn>
                <TableHeaderColumn>url</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody>
              { JSON.parse(this.state.page).map((row, index) => (
                <TableRow key={index} selected={ false }>
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.body}</TableRowColumn>
                  <TableRowColumn>{row.label}</TableRowColumn>
                  <TableRowColumn>{row.url}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    }

    return (
      <h1> Content Page {this.state.page} </h1>
    )
  }
}
