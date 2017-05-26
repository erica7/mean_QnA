console.log('SS answers controller initialized');

var mongoose = require('mongoose');

var Answer = mongoose.model('Answer');
var Question = mongoose.model('Question');
var User = mongoose.model('User');

module.exports = {
  index: function(req, res){
    Answer.find({}).populate('user').populate('question').exec(function(err, answers){
      if(err){
        return res.json(err);
      }
      return res.json(answers);
    })
  },
  create: function(req, res){
    Answer.create(req.body, function(err, answer){
      if(err){
        return res.json(err);
      }
      Question.findByIdAndUpdate(req.body.question, { $push : { answers: answer._id }}, function(err, question){
        if(err){
          return res.json(err);
        }
        User.findByIdAndUpdate(req.body.user, { $push : { answers: answer._id }}, function(err, user){
          if(err){
            return res.json(err);
          }
          return res.json(answer);
        })
      })
    })
  },
  show: function(req, res){
    Answer.findById(req.params.id, function(err, answer){
      if(err){
        return res.json(err);
      }
      if(!answer){
        return res.json({ 
          errors: "404 - Answer not found"
        })
      }
      return res.json(answer);
    })
  },
  // update: function(req, res){
  //
  // },
  // destroy: function(req, res){
  //
  // }
  addLike: function(req, res){
    Answer.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 }}, { new: true }, function(err, answer){
      if(err){
        return res.json(err);
      }
      return res.json(answer);
    })
  }
}
