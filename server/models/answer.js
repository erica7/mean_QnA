var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  answer: {
    type: String,
    required: [true, "Answer cannot be blank."],
    minlength: [5, "Answer is too short."],
    maxlength: [444, "Answer is too long."]
  },
  detail: {
    type: String,
    minlength: [4, "Detail is too short."],
    maxlength: [444, "Detail is too long."]
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  likes: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

mongoose.model('Answer', AnswerSchema);
