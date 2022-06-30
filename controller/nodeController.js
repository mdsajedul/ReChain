const {Node, generateKeys, User, Miner} = require("../Blockchian/Node");
const fs = require('fs');





let node = new Node();
let user = new User();
let miner = new Miner();


// node registration 
function nodeRegistration(req,res,next){
 
    let nodeInfo = req.body;
    node.nodeCreate(nodeInfo);

    let nodesArray = [];
    
    fs.readFile('nodes.json','utf-8',(err,data)=>{
        if(err){
            res.send({'message':'Error occured'})
        }
        else{
            nodesArray = JSON.parse(data.toString())
            nodesArray.push(node)

            let newNodesArray = JSON.stringify(nodesArray)
            fs.writeFile('nodes.json',newNodesArray,(err)=>{
                if(err){
                    res.send({'message':'Error occured'})
                }
                else{
                    res.send({
                        'message':'Node created and saved',
                        newNodesArray

                    })
                }
            })
        }
    })

    // console.log(node)
    // res.send(node)
}


// node login 

function nodeLogin(req,res,next){
    let loginInfo = req.body;

    let nodesArray =[]

    fs.readFile('nodes.json','utf-8',(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            nodesArray = JSON.parse(data.toString())
            
            const currentNode = nodesArray.find(({email})=> email ===loginInfo.email)

            
        
            if(currentNode){
                if(currentNode.password === loginInfo.password){

                    if(currentNode.role==='user'){
                        user.username = currentNode.username;
                        user.email = currentNode.email;
                        user.password = currentNode.password;
                        user.publicKey = currentNode.publicKey;
                        user.privateKey = currentNode.privateKey;
                        user.role = currentNode.role;
                        user.point = currentNode.point;

                        res.send({
                            message:'Login Successfull',
                            'user':user
                        })
                    }
                    else if(currentNode.role === 'miner'){
                        miner.username = currentNode.username;
                        miner.email = currentNode.email;
                        miner.password = currentNode.password;
                        miner.publicKey = currentNode.publicKey;
                        miner.privateKey = currentNode.privateKey;
                        miner.role = currentNode.role;
                        miner.point = currentNode.point;

                        res.send({
                            message:'Login Successfull',
                            'user':miner
                        })
                    }

                    // node.username = currentNode.username;
                    // node.email = currentNode.email;
                    // node.password = currentNode.password;
                    // node.publicKey = currentNode.publicKey;
                    // node.privateKey = currentNode.privateKey;
                    // node.role = currentNode.role;
                    // node.point = currentNode.point;

                    // res.send({
                    //     message:'Login Successfull',
                    //     'user':node
                    // })
                }
                else{
                    res.send({
                        message:'Incorrect Password'
                    })
                }
            }
            else{
                res.send({
                    message:'Email not found'
                })
            }
        }
    })
}


module.exports = {
    nodeRegistration,
    nodeLogin,
    node,
    miner,
    user
}