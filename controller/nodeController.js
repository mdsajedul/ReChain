const Node = require("../Blockchian/Node");
const fs = require('fs');





let node = new Node();


// node registration 
function nodeRegistration(req,res,next){
 
    let nodeInfo = req.body;
    node.nodeCreate(nodeInfo);

    let nodesArray = [];
    
    fs.readFile('nodes.json','utf-8',(err,data)=>{
        if(err){
            res.send('error on first')
        }
        else{
            nodesArray = JSON.parse(data.toString())
            nodesArray.push(node)

            let newNodesArray = JSON.stringify(nodesArray)
            fs.writeFile('nodes.json',newNodesArray,(err)=>{
                if(err){
                    res.send(err)
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
            console.log(currentNode)
            if(currentNode){
                if(currentNode.password === loginInfo.password){

                    node.username = currentNode.username;
                    node.email = currentNode.email;
                    node.password = currentNode.password;
                    node.publicKey = currentNode.publicKey;
                    node.privateKey = currentNode.privateKey;
                    node.role = currentNode.role;
                    node.point = currentNode.point;

                    
                    console.log(node)
    
                    res.send({
                        message:'Login Successfull'
                    })
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
            

            // console.log(nodesArray)
        }
    })

    // console.log(loginInfo)
    // res.send(loginInfo)
}


module.exports = {
    nodeRegistration,
    nodeLogin
}