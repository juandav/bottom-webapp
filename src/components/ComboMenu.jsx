import React       from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem    from 'material-ui/lib/menus/menu-item';

import MenuStore   from '../stores/MenuStore.jsx';
import MenuActions from '../actions/MenuActions.jsx';

import { connector }        from 'reflux-state-mixin';

@connector(MenuStore)
export default class ComboMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  componentDidMount() {
    MenuActions.fetchMenu();
  }

  handleChange(event, index, value){
    this.setState({value});
  }

  render() {
    if(this.state.info) {
      return (
          <SelectField ref="SelectField" value={this.state.value} onChange={this.handleChange.bind(this)}>
            { JSON.parse(this.state.info).map((row, index) => (
                <MenuItem value={ index } key={row._id} primaryText={ row.title }/>
            ))}
          </SelectField>
      );
    }

    return (<p> not content </p>);
  }
}



/*
```javascript

export default class ComboMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  handleChange(event, index, value){
    this.setState({value});
  }

  render() {
    if(this.state.info) {
      return (
          <SelectField ref="SelectField" value={this.state.value} onChange={this.handleChange.bind(this)}>
            { JSON.parse(this.state.info).map((row, index) => (
                <MenuItem value={ index } primaryText={ row.title }/>
            ))}
          </SelectField>
      );
    }

    return (<p> not content </p>);
  }
}

export default class Test extends React.Component {
  render() {
      return (<ComboMenu ref="comboMenu" />);
  }
}

```
*/
