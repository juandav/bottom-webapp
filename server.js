var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080, 'localhost', function(){
  console.log('server fun');
});