const {Block, Rechian} = require('../Blockchian/Rechain');
const { node,miner, user } = require('./nodeController');
const fs = require('fs');
const {socket } = require('../app');



const rechain = new Rechian()


// delete review after mining block
function deleteReview(req,res,send){

    const data = req.body.data;
    const dataString = JSON.stringify(data)

    fs.writeFile('mempool.json',dataString,err=>{
        if(err){
            res.send(err)
        }
        else{
            console.log('Deleted')
        }
    })
}

function mineBlock(req,res,send){

    if(miner.username!=='' && miner.username!==undefined){
        miner.reviewArray = req.body.data;
    
        rechain.addBlock(new Block(miner.reviewArray))
    
      
        console.log(rechain.isValid())

        

        const data = JSON.stringify(rechain.chain)
        
        fs.writeFile('blocks.json',data,err=>{
            if(err){
                res.send(err)
            }
            else{
                res.send({
                    'message':'Mine successfull',
                    'Block':rechain.chain
                    
                })
            }
        })
    }
    else{
        res.send({
            'message':'Authentication Error!!! Please login again'
        })
    }
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

function getBlocks(req,res,send){
    fs.readFile('blocks.json',(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            const blocks = JSON.parse(data)
            res.send(blocks)
        }
    })
}

module.exports={
    mineBlock,collectReview,getAllReviews,getBlocks,deleteReview
}