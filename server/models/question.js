var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  question: {
    type: String,
    required: [true, "Question cannot be blank."],
    minlength: [10, "Question is too short."],
    maxlength: [444, "Question is too long."]
  },
  description: {
    type: String,
    minlength: [4, "Description is too short."],
    maxlength: [444, "Description is too long."]
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }]
}, { timestamps: true })

mongoose.model('Question', QuestionSchema);
