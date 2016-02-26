import React, { Component } from 'react';
import PostStore            from '../../stores/PostStore.jsx';
import PostActions          from '../../actions/PostActions.jsx';
import { connector }        from 'reflux-state-mixin';

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

import TinyMCE from 'react-tinymce';

import SelectField from 'material-ui/lib/select-field';
import MenuItem    from 'material-ui/lib/menus/menu-item';

import ComboBlog from '../../components/ComboBlog.jsx';

@connector(PostStore)
export default class PostContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: 1
    }
  }

  componentDidMount() {
    PostActions.fetchPost();
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleCreate() {
    const title = this.refs.title;
    const state = this.refs.state;
    const blog_id = this.refs.ComboBlog.refs.__CONNECTED_COMPONENT_REF__.refs.SelectField;

    console.log(state);

    PostActions.createPost({
      title  : title.getValue().trim(),
      state  : state.props.children[state.props.value-1].key,
      content: localStorage.getItem("blog"),
      blog_id: blog_id.props.children[blog_id.props.value].key
    });
    this.setState({ open: false });
  }

  _handleEditorChange(e) {
    localStorage.setItem("blog", e.target.getContent());
  }

  _removeRow(row) {
    PostActions.removePost(row);
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    if(this.state.post) {
      const actions = [
        <FlatButton label="Cancel" secondary={ true } onTouchTap={ this.handleClose.bind(this) }/>,
        <FlatButton label="Create" primary={ true } onTouchTap={ this.handleCreate.bind(this) }/>
      ];
      return (
        <div>
          <RaisedButton label="Create Post" primary={true} onTouchTap={ this.handleOpen.bind(this) }/>
          <Dialog
            title='Create new Post'
            actions={actions}
            modal={true}
            open={this.state.open}>

            <ComboBlog ref="ComboBlog" />
            <TextField ref="title" hintText='write the title of the Post' floatingLabelText='Title' />
            <SelectField ref="state" value={this.state.value} onChange={this.handleChange.bind(this)}>
              <MenuItem value={1} key={'draft'} label="draft" primaryText="draft"/>
              <MenuItem value={2} key={'published'} label="published" primaryText="published"/>
              <MenuItem value={3} key={'archived'} label="archived" primaryText="archived"/>
            </SelectField>
            <TinyMCE
              width="200"
              height="400"
              content="<p></p>"
              config={{
                plugins: 'autolink link image lists print preview',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
              }}
              onChange={this._handleEditorChange.bind(this)}
            />
          </Dialog>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>index</TableHeaderColumn>
                <TableHeaderColumn>title</TableHeaderColumn>
                <TableHeaderColumn>content</TableHeaderColumn>
                <TableHeaderColumn>state</TableHeaderColumn>
                <TableHeaderColumn>Delete</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody>
              { JSON.parse(this.state.post).map((row, index) => (
                <TableRow key={index} selected={ false }>
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.title}</TableRowColumn>
                  <TableRowColumn>{row.content}</TableRowColumn>
                  <TableRowColumn>{row.state}</TableRowColumn>
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
      <h1> nothing data </h1>
    )
  }
}

/*
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
*/
