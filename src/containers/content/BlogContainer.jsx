import React, { Component } from 'react';
import BlogStore            from '../../stores/BlogStore.jsx';
import BlogActions          from '../../actions/BlogActions.jsx';
import { connector }        from 'reflux-state-mixin';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

@connector(BlogStore)
export default class BlogContainer extends Component {

  componentDidMount() {
    BlogActions.fetchBlog();
  }

  render() {

    if(this.state.blog) {
      return (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>index</TableHeaderColumn>
                <TableHeaderColumn>name</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody>
              { JSON.parse(this.state.blog).map((row, index) => (
                <TableRow key={index} selected={ false }>
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    }

    return (
      <h1> Content Blog </h1>
    )
  }
}
