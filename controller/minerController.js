const {Block, Rechian} = require('../Blockchian/Rechain');
const { node,miner, user } = require('./nodeController');
const fs = require('fs')

const rechain = new Rechian()

function mineBlock(req,res,send){
    
    rechain.addBlock(new Block(miner.reviewArray))

    console.log(miner)
    console.log(rechain.isValid())

    res.send({
        'message':'Mine successfull',
        'Block':rechain.chain
        
    })
}

function getAllReviews(req,res,send){
    // const username = req.body.username;
    // console.log(username)
    // if(username===miner.user){
        
    // }

    fs.readFile('mempool.json','utf-8',(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            const mempoolData = JSON.parse(data.toString())
            res.send({
                'reviews':mempoolData
            })
        }
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
    mineBlock,collectReview,getAllReviews
}