const Node = require("../Blockchian/Node");
const { checkSchema,body, check,validationResult} =require('express-validator');
// const { options } = require("../Router/minerRouter");


let node = new Node();

const schema = [
    body('username').isString().isLength({min:5}),
    body('password').isString().isLength({min:8}),
    body('email').isEmail(),
    body('role').isString()
]

function registerValidation(req,res,next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({erors:errors.array()})
    }
    next()
}

function nodeRegistration(req,res,next){
 
    let nodeInfo = req.body;
    node.nodeCreate(nodeInfo);
    console.log(node.username)
    console.log(node.publicKey)
    console.log(node.role)
    console.log(nodeInfo)
    res.send(nodeInfo)
}


module.exports = {
    nodeRegistration,
    registerValidation,
    checkSchema,
    schema
}