// Client-site factories send HTTP requests to be handled by server-side routes
// They create an object, add properties to it based on the server response, then return the object

app.factory('answerFactory', function($http, $cookies){
  console.log('CS answer factory initialized');
  var factory = {};
  factory.index = function(callback){
    $http.get('/answers').then(callback);
  }
  factory.show = function(id, callback){
    $http.get('/answers/'+id).then(callback);
  }
  factory.create = function(newAnswer, callback){
    $http.post('/answers', newAnswer).then(callback);
  }
  factory.addLike = function(id, callback){
    $http.post('/answers/'+id+'/like').then(callback);
  }
  return factory;
})
