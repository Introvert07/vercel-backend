const express = require('express');
const router = express.Router();
const { finalSubmit } = require('../controllers/gameController');
const protect = require('../middlewares/authMiddleware');

router.post('/final-submit', protect, finalSubmit);

module.exports = router;
