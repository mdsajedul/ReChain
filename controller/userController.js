
const fs = require('fs')


function test(req,res,send){
    res.send('work properly')
}


{/* 
    getReviewInfo function
        1. take value from req.body
        2.read value from mempool.json in mempoolArray
        3.new value from req.body is added on mempoolArray
        4.write on newMempoolArray on mempool.json
*/}
function getReviewInfo(req,res,send){
    let reviewInfo = req.body;
    let mempoolArray = [];

    fs.readFile('mempool.json','utf-8',(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            mempoolArray = JSON.parse(data.toString())
            mempoolArray.push(reviewInfo)

            const newMemPoolArray = JSON.stringify(mempoolArray)

            fs.writeFile('mempool.json', newMemPoolArray, (err)=>{
                if(err){
                    res.send(error)
                }
                else{
                    res.send({
                        'message':'File saved',
                        newMemPoolArray
                    })
                }
            })
        }
    })
}

module.exports={
    test,
    getReviewInfo
}