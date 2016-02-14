/*
* Module dependencies
*/
import Reflux from 'reflux';

let PostActions = Reflux.createActions([
  'fetchPost',
  'createPost',
  'putPost',
  'removePost'
]);

export default PostActions;
