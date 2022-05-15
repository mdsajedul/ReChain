const Node = require("../Blockchian/Node");
const fs = require('fs');





let node = new Node();



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

    console.log(node)
    // res.send(node)
}


module.exports = {
    nodeRegistration
}