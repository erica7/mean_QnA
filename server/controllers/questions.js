console.log('SS questions controller initialized');

var mongoose = require('mongoose');

var Question = mongoose.model('Question');
var User = mongoose.model('User');

module.exports = {
  index: function(req, res){
    Question.find({}).populate({path: 'user', model: 'User'}).populate({path: 'answers', model: 'Answer', populate: {path: 'user', model: 'User'}}).exec(function(err, questions){
      if(err){
        return res.json(err);
      }
      return res.json(questions);
    })
  },
  create: function(req, res){
    Question.create(req.body, function(err, question){
      if(err){
        return res.json(err);
      }
      User.findByIdAndUpdate(req.body.user, { $push : { questions: question._id }}, function(err, user){
        if(err){
          return res.json(err);
        }
        return res.json(question);
      })
    })
  },
  show: function(req, res){
    Question.findById(req.params.id).populate({path: 'user', model: 'User'}).populate({path: 'answers', model: 'Answer', populate: {path: 'user', model: 'User'}}).exec(function(err, question){
      if(err){
        return res.json(err);
      }
      if(!question){
        return res.json({ 
          errors: "404 - Question not found"
        })
      }
      return res.json(question);
    })
  },
  // update: function(req, res){
  //
  // },
  // destroy: function(req, res){
  //
  // }
}
