import React, { Component } from 'react';
import PostStore            from '../../stores/PostStore.jsx';
import PostActions          from '../../actions/PostActions.jsx';
import { connector }          from 'reflux-state-mixin';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

@connector(PostStore)
export default class PostContainer extends Component {

  componentDidMount() {
    PostActions.fetchPost();
  }

  render() {

    if(this.state.post) {
      return (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>index</TableHeaderColumn>
                <TableHeaderColumn>title</TableHeaderColumn>
                <TableHeaderColumn>content</TableHeaderColumn>
                <TableHeaderColumn>state</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody>
              { JSON.parse(this.state.post).map((row, index) => (
                <TableRow key={index} selected={ false }>
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.title}</TableRowColumn>
                  <TableRowColumn>{row.content}</TableRowColumn>
                  <TableRowColumn>{row.state}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    }

    return (
      <h1> Content Post </h1>
    )
  }
}
