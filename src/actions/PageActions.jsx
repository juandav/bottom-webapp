/*
* Module dependencies
*/
import Reflux from 'reflux';

let PageActions = Reflux.createActions([
  'fetchPage',
  'createPage',
  'putPage',
  'removePage'
]);

export default PageActions;
