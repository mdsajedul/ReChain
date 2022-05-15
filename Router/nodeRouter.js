const express = require('express');
const { nodeRegistration, nodeLogin } = require('../controller/nodeController');
const inputValidation = require('../Schemas/inputValidation');

const {userSchema,loginSchema} = require('../Schemas/userSchema');


const router = express.Router();


router.post('/register',userSchema, inputValidation,nodeRegistration)
router.post('/login',loginSchema,inputValidation,nodeLogin)

module.exports = router;