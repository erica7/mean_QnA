var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'First name cannot be blank.'],
    minlength: [2, 'First name is too short.'],
    maxlength: [102, 'First name is too long']
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank.'],
    minlength: [4, 'Password must be at least 4 characters long.'],
    maxlength: [444, 'Password cannot be longer than 444 characters.']
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }]
}, { timestamps: true })

UserSchema.methods.hashPassword = function(password){
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.authenticate = function(password){
  return bcrypt.compareSync(password, this.password);
}

UserSchema.pre('save', function(callback){
  this.hashPassword(this.password);
  callback();
})

mongoose.model('User', UserSchema);
