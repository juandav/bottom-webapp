import React       from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem    from 'material-ui/lib/menus/menu-item';

import BlogStore   from '../stores/BlogStore.jsx';
import BlogActions from '../actions/BlogActions.jsx';

import { connector }        from 'reflux-state-mixin';

@connector(BlogStore)
export default class ComboBlog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  componentDidMount() {
    BlogActions.fetchBlog();
  }

  handleChange(event, index, value){
    this.setState({value});
  }

  render() {
    if(this.state.blog) {
      return (
          <SelectField ref="SelectField" value={this.state.value} onChange={this.handleChange.bind(this)}>
            { JSON.parse(this.state.blog).map((row, index) => (
                <MenuItem value={ index } key={row._id} primaryText={ row.name }/>
            ))}
          </SelectField>
      );
    }

    return (<p> not content </p>);
  }
}
