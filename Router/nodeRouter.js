const express = require('express');
const { nodeRegistration, nodeLogin } = require('../controller/nodeController');
const registerValidation = require('../Schemas/registerValidation');
const userSchema = require('../Schemas/userSchema');


const router = express.Router();


router.post('/register',userSchema, registerValidation,nodeRegistration)
router.post('/login',nodeLogin)

module.exports = router;