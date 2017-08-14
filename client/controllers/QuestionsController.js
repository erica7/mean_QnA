// Client-side controller

app.controller('QuestionsController', function(questionFactory, answerFactory, $routeParams, $location, $cookies){
  console.log('CS questions controller initialized');
  var self = this;
  self.questions = [];
  self.question = {};
  self.errors = [];
  self.newQuestionId;
  self.index = function(){
    questionFactory.index(function(res){
      self.questions = res.data;
    })
  }
  self.create = function(newQuestion){
    self.errors = [];
    if(newQuestion){
      newQuestion.user = $cookies.get('userId');
      questionFactory.create(newQuestion, function(res){
        self.newQuestion = {};
        if (res.data.errors) {
          for(key in res.data.errors){
            self.errors.push(res.data.errors[key].message);
          }
        } else {
          $location.url('/');
        }
      })
    } else {
      self.errors.push('Question cannot be blank.')
    }
  }
  self.show = function(){
    questionFactory.show($routeParams.id, function(res){
      if (res.data.errors) {
        for(key in res.data.errors){
          var error = res.data.errors[key];
          self.errors.push(error);
        }
      } else {
        self.question = res.data;
      }
    });
  }
  self.addLike = function(answerId){
    answerFactory.addLike(answerId, self.show);
  }
})
