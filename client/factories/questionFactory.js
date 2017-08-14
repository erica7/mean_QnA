// Client-site factories send HTTP requests to be handled by server-side routes
// They create an object, add properties to it based on the server response, then return the object

app.factory('questionFactory', function($http, $cookies){
  console.log('CS question factory initialized');
  var factory = {};
  factory.index = function(callback){
    $http.get('/questions').then(callback);
  }
  factory.show = function(id, callback){
    $http.get('/questions/'+id).then(callback);
  }
  factory.create = function(newQuestion, callback){
    $http.post('/questions', newQuestion).then(callback);
  }
  return factory;
})
