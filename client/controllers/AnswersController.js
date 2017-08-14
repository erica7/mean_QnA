// Client-side controller

app.controller('AnswersController', function(answerFactory, $routeParams, $location, $cookies){
  console.log('CS answers controller initialized');
  var self = this;
  self.answers = [];
  self.errors = [];
  self.newAnswerId;
  self.index = function(){
    answerFactory.index(function(res){
      self.answers = res.data;
    })
  }
  self.create = function(newAnswer){
    self.errors = [];
    if(newAnswer){
      newAnswer.user = $cookies.get('userId');
      newAnswer.question = $routeParams.id
      answerFactory.create(newAnswer, function(res){
        self.newAnswer = {};
        if (res.data.errors) {
          for(key in res.data.errors){
            self.errors.push(res.data.errors[key].message);
          }
        } else {
          $location.url('/')
        }
      })
    } else {
      self.errors.push('Answer cannot be blank.')
    }
  }
  // PUT IN THE QUESTIONS CONTROLLER TO INVOKE ITS 'SHOW' METHOD AS A CALLBACK
  // self.addLike = function(answerId){
  //   answerFactory.addLike(answerId, self.index);
  // }
})
