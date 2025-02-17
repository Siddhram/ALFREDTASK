const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
    userId: { type: String },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  box: { type: Number, default: 1 },
  nextReviewDate: { type: Date, default: Date.now }
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

module.exports=Flashcard