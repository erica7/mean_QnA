// Client-side controller

app.controller('UsersController', function(userFactory, $location, $routeParams, $cookies){
  console.log('CS users controller initialized');
  var self = this;
  self.users = [];
  self.currentUser = {};
  // self.errors = [];
  self.registrationErrors = [];
  self.loginErrors = [];
  self.index = function(){
    userFactory.index(function(res){
      self.users = res.data;
    })
  }
  self.show = function(){
    userFactory.show($routeParams.id, function(res){
      self.friend = res.data;
    });
  }
  self.create = function(newUser){
    // 'reset' the two types of errors to empty arrays
    self.registrationErrors = [];
    self.loginErrors = [];
    if (newUser) {
      if (newUser.password != newUser.password_confirmation) {
        self.registrationErrors = ['Passwords do not match.'];
      } else {
        userFactory.create(newUser, function(res){
          self.newUser = {};
          if (res.data.errors || res.data.code == 1100) {
            if (res.data.code == 11000) {
              self.registrationErrors.push('Email is already registered.');
            }
            for(key in res.data.errors){
              self.registrationErrors.push(res.data.errors[key].message);
            }
          } else {
            $cookies.put('userId', res.data._id);
            $location.url('/');
          }
        })
      }
    } else {
      self.registrationErrors.push('Registration cannot be blank.')
    }
  }
  self.login = function(checkUser){
    // 'reset' the two types of errors to empty arrays
    self.loginErrors = [];
    self.registrationErrors = [];
    userFactory.login(checkUser, function(res){
      self.checkUser = {};
      if (res.data.errors) {
        for(key in res.data.errors){
          var error = res.data.errors[key];
          self.loginErrors.push(res.data.errors[key].message);
        }
      } else {
        $cookies.put('userId', res.data._id);
        $location.url('/');
      }
    })
  }
  self.logout = function(){
    // remove the user id cookie
    $cookies.remove('userId');
    // route to the login/registration page
    $location.url('/index');
  }
  // check method is invoked on every partial HTML view except login/registration page to ensure user is logged in before showing data
  self.check = function(){
    // call check method in the user factory
    userFactory.check(function(user){
      // if a user object is returned, assign the object to a variable currentUser
      if (user) {
        self.currentUser = user;
      // if a user is not found, route to the login/registration page
      } else {
        $location.url('/index');
      }
    })
  }
})
