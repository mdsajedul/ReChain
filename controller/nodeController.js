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
    console.log(loginInfo)

    let nodesArray =[]

    fs.readFile('nodes.json','utf-8',(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            nodesArray = JSON.parse(data.toString())
            console.log(nodesArray)
            
            const currentNode = nodesArray.find(({email})=> email ===loginInfo.email)
            console.log(currentNode)
            
        
            if(currentNode){
                console.log('node found')
                if(currentNode.password === loginInfo.password){
                    console.log('password matched')
                    if(currentNode.role.toLowerCase()==='user'){
                        console.log('user found')
                        user.username = currentNode.username;
                        user.email = currentNode.email;
                        user.password = currentNode.password;
                        user.publicKey = currentNode.publicKey;
                        user.privateKey = currentNode.privateKey;
                        user.role = currentNode.role;

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
                       

                        res.send({
                            message:'Login Successfull',
                            'user':miner
                        })
                    }

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