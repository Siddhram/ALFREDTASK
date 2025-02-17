const express = require('express');
const cors = require('cors');
const Flashcard = require('./falshSchema');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app = express();
const userRouter= require('./userRoutes');
const authMiddleware = require('./middleware');
dotenv.config();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// Flashcard Schema
// const flashcardSchema = new mongoose.Schema({
//   question: { type: String, required: true },
//   answer: { type: String, required: true },
//   box: { type: Number, default: 1 },
//   nextReviewDate: { type: Date, default: Date.now }
// });

// const Flashcard = mongoose.model('Flashcard', flashcardSchema);

// POST /flashcards - Add a new flashcard
app.use('/user',userRouter)
app.post('/flashcards',authMiddleware, async (req, res) => {
  const { question, answer } = req.body;
  console.log(req.user);
  
  const newFlashcard = new Flashcard({
    userId:req.user.userId,
     email: req.user.email,
    question,
    answer,
    box: 1,
    nextReviewDate: new Date()
  });

  try {
    const savedFlashcard = await newFlashcard.save();
    res.status(201).json(savedFlashcard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /flashcards - Get all flashcards
app.get('/flashcards',authMiddleware, async (req, res) => {
  try {
    const flashcards = await Flashcard.find({    userId:req.user.userId});
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /flashcards/:id - Update a flashcard (move to next box if correct)
app.put('/flashcards/:id',authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { correct } = req.body;

  try {
    const flashcard = await Flashcard.findById(id);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    // Leitner System Logic
    if (correct) {
      flashcard.box = Math.min(flashcard.box + 1, 5); // Max 5 boxes
      let intervalDays = Math.pow(2, flashcard.box - 1); // 1, 2, 4, 8, 16 days
      flashcard.nextReviewDate = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000);
    } else {
      flashcard.box = 1;
      flashcard.nextReviewDate = new Date();
    }

    const updatedFlashcard = await flashcard.save();
    res.status(200).json(updatedFlashcard);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /flashcards/:id - Delete a flashcard
app.delete('/flashcards/:id',authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFlashcard = await Flashcard.findByIdAndDelete(id);
    if (!deletedFlashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    res.status(200).json({ message: 'Flashcard deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
