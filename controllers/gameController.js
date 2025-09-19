// controllers/gameController.js
const User = require('../models/User');

const finalSubmit = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user || !user.startTime) {
      return res.status(400).json({ message: "Timer not started or user not found" });
    }

    const endTime = new Date();
    const duration = Math.floor((endTime - user.startTime) / 1000); // seconds

    user.endTime = endTime;
    user.duration = duration;
        user.isFinished = true; // ✅ Prevents further game access

    await user.save();

    res.json({
      message: "Final submission successful",
      duration,
      logout: true
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit", error: error.message });
  }
};

module.exports = { finalSubmit };
