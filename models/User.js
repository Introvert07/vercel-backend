// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  enrollment: { type: String, unique: true },
  username: { type: String, unique: true },
  email: String,
  password: String,
  score: { type: Number, default: 0 },
  solvedFlags: [{ type: String }],
  startTime: { type: Date },
  endTime: { type: Date },
  duration: { type: Number }, // in seconds
  finalSubmitted: { type: Boolean, default: false }, // ✅ Add this
  submittedAt: { type: Date },        
   isFinished: {
    type: Boolean,
    
    default: false, // initially false
  },                // ✅ Add this
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
