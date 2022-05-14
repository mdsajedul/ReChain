const Node = require("../Blockchian/Node");
const { checkSchema,body, check,validationResult} =require('express-validator');



let node = new Node();



function nodeRegistration(req,res,next){
 
    let nodeInfo = req.body;
    node.nodeCreate(nodeInfo);
    console.log(node.username)
    console.log(node.publicKey)
    console.log(node.role)

    res.send(node)
}


module.exports = {
    nodeRegistration
}