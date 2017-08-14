// Server-side controller

console.log('SS users controller initialized');

var mongoose = require('mongoose');

var User = mongoose.model('User');

module.exports = {
  index: function(req, res){
    User.find({}).populate('questions').populate('answers').exec(function(err, users){
      if(err){
        return res.json(err);
      }
      return res.json(users);
    })
  },
  create: function(req, res){
    User.create(req.body, function(err, user){
      if(err){
        return res.json(err);
      }
      return res.json(user);  // when to 'login' ??
    })
  },
  show: function(req, res){
    User.findById(req.params.id, function(err, user){
      if(err){
        return res.json(err);
      }
      if(!user){
        return res.json({    ////// is this the right format for the error messages?
          errors: "404 - User not found"
        })
      }
      return res.json(user);
    })
  },
  // update: function(req, res){
  //
  // },
  // destroy: function(req, res){
  //
  // }
  login: function(req, res){
    User.findOne({ name: req.body.name }, function(err, user){
      if(err){
        return res.json(err);
      }
      if(user && user.authenticate(req.body.password)){
        return res.json(user);
      }
      return res.json({
        errors: {
          password: {
            message: "Invalid credentials."
          }
        }
      })
    })
  }
}
