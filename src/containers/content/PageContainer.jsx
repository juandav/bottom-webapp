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
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/remove';

import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

import TinyMCE from 'react-tinymce';

import ComboMenu from '../../components/ComboMenu.jsx';

@connector(PageStore)
export default class PageContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  componentDidMount() {
    PageActions.fetchPage();
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleCreate() {
    const label = this.refs.label;
    const body = this.refs.body;
    const menu_id = this.refs.ComboMenu.refs.__CONNECTED_COMPONENT_REF__.refs.SelectField;

    PageActions.createPage({
      menu_id: menu_id.props.children[menu_id.props.value].key,
      label  : label.getValue().trim(),
      body   : localStorage.getItem("page")
    });
    this.setState({ open: false });
  }

  _handleEditorChange(e) {
    localStorage.setItem("page", e.target.getContent());
  }

  _removeRow(row) {
    PageActions.removePage(row);
  }

  render() {
    if(this.state.page) {
      const actions = [
        <FlatButton label="Cancel" secondary={ true } onTouchTap={ this.handleClose.bind(this) }/>,
        <FlatButton label="Create" primary={ true } onTouchTap={ this.handleCreate.bind(this) }/>
      ];
      return (
        <div>
          <RaisedButton label="Create Page" primary={true} onTouchTap={ this.handleOpen.bind(this) }/>
          <Dialog
            title='Create new page'
            actions={actions}
            modal={true}
            open={this.state.open}>

            <ComboMenu ref="ComboMenu" />
            <TextField ref='label' hintText='write the label of the page' floatingLabelText='Label' />
            <TinyMCE
              width="200"
              height="400"
              content="<p>This is the initial content of the editor</p>"
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
                <TableHeaderColumn>body</TableHeaderColumn>
                <TableHeaderColumn>label</TableHeaderColumn>
                <TableHeaderColumn>url</TableHeaderColumn>
                <TableHeaderColumn>Delete</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody>
              { JSON.parse(this.state.page).map((row, index) => (
                <TableRow key={index} selected={ false }>
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.body}</TableRowColumn>
                  <TableRowColumn>{row.label}</TableRowColumn>
                  <TableRowColumn>{row.url}</TableRowColumn>
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
      <h1> Content Page {this.state.page} </h1>
    )
  }
}
