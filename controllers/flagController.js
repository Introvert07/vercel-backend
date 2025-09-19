const User = require('../models/User');

const FLAG_VALUES = {
  // ✅ Round 1 & 2 flags (10 points each)
  'flag1-angular': 10,
  'flag2-jquery': 10,
  'flag3-vue': 10,
  'flag1-phishing': 10,
  'flag2-man in the middle': 10,
  'flag3-packet sniffing': 10,
  'riddle1-input': 10,
  'riddle2-hover': 10,
  'riddle3-z-index': 10,

  'FLAG{wind-trajectory-master}': 10,
  'FLAG{memory-master}': 10,
  'FLAG{you-are-elite}': 10,
  'FLUX{Escape_The_Maze}': 10,
  'CSE{You_Are_a_Debugging_Ninja}': 10,
  'color': 10,

  // ✅ Round 3 flags (10 points each)
  'PASS': 10,        // Flying Ship game
  'Princess': 10,    // Princess of the Prison game
};

// Total flags = 15 (old) + 2 (new Round 3) = 17
const TOTAL_FLAGS = 17;

const submitFlag = async (req, res) => {
  const { flag } = req.body;
  const userId = req.user; // from JWT middleware

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Already solved check
    if (user.solvedFlags.includes(flag)) {
      return res.status(400).json({ message: 'Flag already submitted' });
    }

    // Invalid flag check
    if (!FLAG_VALUES[flag]) {
      return res.status(400).json({
        message: 'Invalid flag. Please enter it exactly as shown (case-sensitive).',
      });
    }

    // Set start time if it's the first flag
    if (!user.startTime) {
      user.startTime = new Date();
    }

    // Update score and solved flags
    user.score += FLAG_VALUES[flag];
    user.solvedFlags.push(flag);

    // If all flags are now submitted, record endTime and duration
    if (user.solvedFlags.length === TOTAL_FLAGS) {
      user.endTime = new Date();
      user.duration = Math.floor((user.endTime - user.startTime) / 1000); // seconds
    }

    await user.save();

    res.json({
      message: `Flag accepted (+${FLAG_VALUES[flag]} points)`,
      score: user.score,
      flagsSolved: user.solvedFlags.length,
      ...(user.duration && { duration: user.duration + ' seconds' }),
    });
  } catch (err) {
    res.status(500).json({ message: 'Submission failed', error: err.message });
  }
};

module.exports = { submitFlag };
