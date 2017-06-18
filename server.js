var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var app = express();

app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/client/static/img/favicon.ico'))

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(1112, function(){
  console.log('listening on 1112...');
})
