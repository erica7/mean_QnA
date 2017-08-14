// AngularJS config file specifies templates and controllers for routes

var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider){
  $routeProvider
  .when('/index', {
    templateUrl: '/partials/index.html',
    controller: 'UsersController as UC'
  })
  .when('/', {
    templateUrl: '/partials/questions.html',
    controller: 'UsersController as UC'
  })
  .when('/new_question', {
    templateUrl: '/partials/newQuestion.html',
    controller: 'UsersController as UC'
  })
  .when('/questions/:id', {
    templateUrl: '/partials/showQuestion.html',
    controller: 'UsersController as UC'
  })
  .when('/questions/:id/new_answer', {
    templateUrl: '/partials/newAnswer.html',
    controller: 'UsersController as UC'
  })
  .otherwise({ redirectTo: '/index' })
});
