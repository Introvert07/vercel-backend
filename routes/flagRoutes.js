// routes/flagRoutes.js
const express = require('express');
const router = express.Router();
const { submitFlag } = require('../controllers/flagController');
const protect = require('../middlewares/authMiddleware');

router.post('/submit', protect, submitFlag);

module.exports = router;
