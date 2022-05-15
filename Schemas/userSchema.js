const {body} =require('express-validator');

const userSchema = [
    body('username').isString().isLength({min:5}).withMessage('Username length should be more than 8 character and string'),
    body('password').isString().isLength({min:8}).withMessage('Password length should be more than 8 character'),
    body('email').isEmail().withMessage('Please input a proper email address'),
    body('role').isString().withMessage('Role will be User or Miner')
]

const loginSchema = [
    body('email').isEmail().withMessage('Please input a proper email address'),
    body('password').isString().isLength({min:8}).withMessage('Password length should be more than 8 character')
]

const reviewSchema =[
    body('username').isString().isLength({min:5}).withMessage('Authentication Error!!!'),
    body('reviewData').isObject()

]


module.exports = {
    userSchema,loginSchema,reviewSchema
}