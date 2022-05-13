const express = require('express');
const { test, getReviewInfo } = require('../controller/userController');

const router = express.Router();

router.get('/test',test);
router.post('/submit',getReviewInfo)

module.exports = router;