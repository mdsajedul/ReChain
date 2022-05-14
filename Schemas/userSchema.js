const { checkSchema,body, check,validationResult} =require('express-validator');

const userSchema = [
    body('username').isString().isLength({min:5}),
    body('password').isString().isLength({min:8}),
    body('email').isEmail(),
    body('role').isString()
]


module.exports = userSchema