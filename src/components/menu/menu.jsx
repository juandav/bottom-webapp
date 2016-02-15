import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';

export default class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  _handleClose(){
    this.setState({
      open: false
    });
  }

  _handleToggleMenu(){
    this.props.history.push('/menu');
  }
  _handleTogglePage(){
    this.props.history.push('/page');
  }
  _handleToggleBlog(){
    this.props.history.push('/blog');
  }
  _handleTogglePost(){
    this.props.history.push('/post');
  }

  componentDidMount(){
    this.state.open = this.props.click;
  }

  _hanldeChangeState(){
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <div>
        <LeftNav docked={false} open={ this.state.open } openRight={true} onRequestChange={ this._hanldeChangeState.bind(this) }>
          <MenuItem onTouchTap={this._handleToggleMenu.bind(this)}>Menus</MenuItem>
          <MenuItem onTouchTap={this._handleTogglePage.bind(this)}>Page</MenuItem>
          <MenuItem onTouchTap={this._handleToggleBlog.bind(this)}>Blog</MenuItem>
          <MenuItem onTouchTap={this._handleTogglePost.bind(this)}>Post</MenuItem>
        </LeftNav>
      </div>
    )
  }
}
