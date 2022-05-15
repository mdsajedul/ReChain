const express = require('express');
const { getReviewInfo } = require('../controller/userController');
const inputValidation = require('../Schemas/inputValidation');
const { reviewSchema } = require('../Schemas/userSchema');

const router = express.Router();

router.post('/submit',reviewSchema,inputValidation, getReviewInfo)

module.exports = router;