const express = require('express');
const { schema,nodeRegistration, registerValidation } = require('../controller/nodeController');
const {checkSchema} =require('../controller/nodeController')


const router = express.Router();


router.post('/register',schema, registerValidation,nodeRegistration)

module.exports = router;