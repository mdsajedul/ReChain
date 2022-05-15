const express = require('express');
const { getReviewInfo } = require('../controller/userController');

const router = express.Router();

router.post('/submit',getReviewInfo)

module.exports = router;