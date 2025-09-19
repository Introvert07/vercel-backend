// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/flags', require('./routes/flagRoutes'));
app.use('/api/final-submit', require('./routes/gameRoutes'));

app.get("/", (req,res) => {
    return res.status(200).json({
        message: "Working",
        success:true,
    })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
