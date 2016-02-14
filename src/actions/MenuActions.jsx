/*
* Module dependencies
*/
import Reflux from 'reflux';

let MenuActions = Reflux.createActions([
  'fetchMenu',
  'createMenu',
  'putMenu',
  'removeMenu'
]);

export default MenuActions;
