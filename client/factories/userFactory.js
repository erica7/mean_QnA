// Client-site factories send HTTP requests to be handled by server-side routes
// They create an object, add properties to it based on the server response, then return the object

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
    // get the user id from the cookie
    var userId = $cookies.get('userId');
    // if there isn't a user id in the cookie, return false
    if(!userId){
      return callback(false);
    }
    // check if the user id in the cookie matches an entry in the database by running a route to the server-side routes
    $http.get('/users/'+userId).then(function(res){
      // if a match is not found, return false
      if (res.data.errors) {
        return callback(false);
      }
      // if a match is found, return the user object in an object res.data
      return callback(res.data);
    })
  }
  return factory;
})
