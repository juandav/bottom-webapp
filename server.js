var express = require('express');
var path = require('path');

var app = express();

app.set('views', `${__dirname}/public`)
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.render('index')
})

app.listen(8080, 'localhost', function(){
  console.log('server fun');
});
