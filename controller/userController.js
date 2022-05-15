
const fs = require('fs');
const { node } = require('./nodeController');
const eccrypto = require('eccrypto')



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
function  getReviewInfo(req,res,send){
    let reviewInfo = req.body;
    let mempoolArray = [];
    console.log(node)

    if(reviewInfo.username === node.username){
        console.log('username Matched')

        fs.readFile('mempool.json','utf-8',(err,data)=>{
            if(err){
                res.send(err)
            }
            else{
                // read and pasrse json data from mempool and stored in mempoolArray 
                mempoolArray = JSON.parse(data.toString())

                let reviewData = reviewInfo.reviewData;
                let stringReviewData = JSON.stringify(reviewData);
                

                // get public key and convert on to buffer 
                // const encryptedReviewData = eccrypto.encrypt(node.publicKey,reviewData)


                let userPublicKey = Buffer.from(node.publicKey,'base64')
                let userPrivateKey = Buffer.from(node.privateKey,'base64')
                
                

                let encryption = eccrypto.encrypt(userPublicKey,stringReviewData)
                // .then((encrypted)=>{
                //     console.log('Encrypted Buffer');
                //     // console.log(encrypted);
                //     return encrypted;
                //     //  eccrypto.decrypt(userPrivateKey,encrypted).then((plainText)=>{
                //     //     console.log(plainText)
                //     // })

                let encryptedData = encryption.then((encryptedValue)=>{
                    return encrypte
                })
                // })
                console.log(encrypData)


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
    test,
    getReviewInfo
}