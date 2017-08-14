// Node Server file

// require necessary modules
var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

// create an Express application object
var app = express();

// use client files, bower components, body-parser.json, and favicon
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/client/static/img/favicon.ico'))

// require the mongoose and routes files
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

// start the server on port 1112; provide a console note to confirm it started properly
app.listen(1112, function(){
  console.log('listening on 1112...');
})
