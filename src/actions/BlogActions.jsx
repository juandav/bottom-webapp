/*
* Module dependencies
*/
import Reflux from 'reflux';

let BlogActions = Reflux.createActions([
  'fetchBlog',
  'createBlog',
  'putBlog',
  'removeBlog'
]);

export default BlogActions;
