const ReChain = require('../Blockchian/Rechain');
const { node,miner, user } = require('./nodeController');
const fs = require('fs')

const rechain =new ReChain();

function mineBlock(req,res,send){
    // const previousBlock = rechain.getPreviousBlock();
    // const prevousNonce = previousBlock['nonce']

    rechain.createBlock()

    console.log(miner)

    res.send({
        'message':'Mine successfull',
        'Block':rechain.chain
        
    })
}

// miner collects review data from mempool 
function collectReview(req,res,send){

    const username = req.body.username;
    if(username===miner.username){

        // read all reviews from mempool 
        fs.readFile('mempool.json','utf-8',(err,data)=>{
            if(err){
                res.send({message:err})
            }
            else{
                mempoolArray = JSON.parse(data.toString())

                if(mempoolArray.length>0){
                    miner.reviewArray.push(mempoolArray[0])
                    mempoolArray.shift();

                    let mempoolArrayStringify =JSON.stringify(mempoolArray)

                    fs.writeFile('mempool.json',mempoolArrayStringify,(err)=>{
                        if(err){
                            res.send(err)
                        }
                        else{
                            res.send({
                                'message':'Collected',
                                'collected':miner.reviewArray,
                                'all review':mempoolArray
                            })
                        }
                    })
                }
                else{
                    res.send({
                        'message':"Mempool empty now!!!"
                    })
                }

                
                
            }
        })
    }
    else{
        res.send({
            'message':'Authentication Error!!!'
        })
    }
}

module.exports={
    mineBlock,collectReview
}