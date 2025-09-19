const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');
const User = require('../models/User');



// Public routes
router.post('/signup', signup);
router.post('/login', login);

// ✅ Protected route to get current user's score
router.get('/score', protect, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user }); // ✅ req.user = userId
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      username: user.username,
      score: user.score,
      solvedFlags: user.solvedFlags,
    });
  } catch (error) {
    console.error("Error in /score route:", error);
    res.status(500).json({ message: 'Error fetching score', error });
  }
});

router.post('/final-submit', protect, async (req, res) => {
  try {
    const userId = req.user; // ✅ use directly

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.endTime = new Date();
    user.duration = Math.floor((user.endTime - user.startTime) / 1000); // seconds
    user.finalSubmitted = true;
    
    user.submittedAt = new Date();
    user.isFinished = true;

    await user.save();

    res.status(200).json({ message: 'Final submit successful', user });
  } catch (err) {
    console.error("Final submit error:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Optional test route to verify auth works
router.get('/me', protect, (req, res) => {
  res.json({ message: 'You are authenticated!', userId: req.user });
});

module.exports = router;
