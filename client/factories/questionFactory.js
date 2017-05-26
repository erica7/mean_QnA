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
