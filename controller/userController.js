
const fs = require('fs');
const { node,user } = require('./nodeController');
const { encryptString, decryptString } = require('../Additional/nodeAdditional');




{/* 
    getReviewInfo function
        1. take value from req.body
        2.read value from mempool.json in mempoolArray
        3.new value from req.body is added on mempoolArray
        4.write on newMempoolArray on mempool.json
*/}



function  getReviewInfo(req,res,send){
    let reviewInfo = req.body;
    let mempoolArray = [];
    

    if(reviewInfo.username === user.username){
        

        fs.readFile('mempool.json','utf-8',(err,data)=>{
            if(err){
                res.send(err)
            }
            else{
                // read and pasrse json data from mempool and stored in mempoolArray 
                mempoolArray = JSON.parse(data.toString())

                let reviewData = reviewInfo.reviewData;

                //Review data from Review Info, review data stringigy for encryption
                let stringReviewData = JSON.stringify(reviewData);

                //encrypt function call
                let encryptedReviewData = encryptString(stringReviewData, user.publicKey)

                // decrypt function call
                // let decryptedReviewData = decryptString(encryptedReviewData, node.privateKey);
                // console.log("Decrypted value: "+decryptedReviewData)

                reviewInfo.reviewData = encryptedReviewData;
                
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
    else{
        res.send({
            "message":"Authentication Error!!!"
        })
    }

    
}

module.exports={
    getReviewInfo
}