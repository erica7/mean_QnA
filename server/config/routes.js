// Routes
// Include the server-side controllers to call their methods
// Routes are constructed in RESTful architecture

var User = require('./../controllers/users.js');
var Question = require('./../controllers/questions.js');
var Answer = require('./../controllers/answers.js');

module.exports = function(app){

  app.get('/users', User.index);
  app.post('/users', User.create);
  app.post('/login', User.login);
  app.get('/users/:id', User.show);

  app.get('/questions', Question.index);
  app.post('/questions', Question.create);
  app.get('/questions/:id', Question.show);

  app.get('/answers', Answer.index);
  app.post('/answers', Answer.create);
  app.post('/answers/:id/like', Answer.addLike);

}
