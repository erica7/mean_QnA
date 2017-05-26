app.factory('userFactory', function($http, $cookies){
  console.log('CS user factory initialized');
  var factory = {};
  factory.index = function(callback){
    $http.get('/users').then(callback);
  }
  factory.show = function(id, callback){
    $http.get('/users'+id).then(callback);
  }
  factory.create = function(newUser, callback){
    $http.post('/users', newUser).then(callback);
  }
  factory.login = function(checkUser, callback){
    $http.post('/login', checkUser).then(callback);
  }
  factory.check = function(callback){
    var userId = $cookies.get('userId');
    if(!userId){
      return callback(false);
    }
    $http.get('/users/'+userId).then(function(res){
      if (res.data.errors) {
        return callback(false);
      }
      return callback(res.data);
    })
  }
  return factory;
})
