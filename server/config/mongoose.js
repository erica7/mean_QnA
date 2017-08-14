// Use Mongoose to establish a connection to the database

// require mongoose and fs modules
var mongoose = require('mongoose');
var fs = require('fs');

// connect to the database
mongoose.connect('mongodb://localhost/mean_QnA');

// set mongoose.Promise to global.Promise
mongoose.Promise = global.Promise;

// store the model path in a variable
var models_path = __dirname + '/../models';

// requires each model file in the models folder 
fs.readdirSync(models_path).forEach(function(file){
  if(file.indexOf('.js') >= 0){
    console.log('loading',file,'...');
    require(models_path + '/' + file);
  }
})
