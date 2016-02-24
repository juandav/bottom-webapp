import React, { Component } from 'react';
import BlogStore            from '../../stores/BlogStore.jsx';
import BlogActions          from '../../actions/BlogActions.jsx';
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

import Paper from 'material-ui/lib/paper';

const style = {
  margin: 20,
  display: 'inline-block'
};


@connector(BlogStore)
export default class BlogContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  componentDidMount() {
    BlogActions.fetchBlog();
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleCreate() {
    const name = this.refs.name;
    BlogActions.createBlog({ name: name.getValue().trim() });
    this.setState({ open: false });
  }

  _removeRow(row) {
    BlogActions.removeBlog(row);
  }

  render() {
    if(this.state.blog) {
      const actions = [
        <FlatButton label="Cancel" secondary={ true } onTouchTap={ this.handleClose.bind(this) }/>,
        <FlatButton label="Create" primary={ true } onTouchTap={ this.handleCreate.bind(this) }/>
      ];
      return (
        <div>
          <Paper style={style} zDepth={2}>
            <RaisedButton label="Create Blog" primary={true} onTouchTap={ this.handleOpen.bind(this) }/>
            <Dialog
              title='Create new blog'
              actions={actions}
              modal={true}
              open={this.state.open}>

              <TextField ref='name' hintText='write the name of the blog' floatingLabelText='name' />
            </Dialog>
            <Table selectable={ false }>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Delete</TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody>
                { JSON.parse(this.state.blog).map((row, index) => (
                  <TableRow key={index} selected={ false }>
                    <TableRowColumn>{index}</TableRowColumn>
                    <TableRowColumn>{row.name}</TableRowColumn>
                    <TableRowColumn>
                      <FloatingActionButton mini={true} onClick={ this._removeRow.bind(this, row) } >
                        <ContentAdd />
                      </FloatingActionButton>
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      )
    }

    return (
      <h1> Content Blog </h1>
    )
  }
}

/*
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

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

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
*/
