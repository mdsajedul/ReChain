
const fs = require('fs');
const { node } = require('./nodeController');
const eccrypto = require('eccrypto');
const { encryptString, decryptString } = require('../Additional/nodeAdditional');
var path = require("path");
const { generateKeys } = require('../Blockchian/Node');
var crypto = require("crypto");
const passphrase = "mySecret"



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
    // console.log(node)

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
                

                //***********         testing         */

                var encryptString = function(toEncrypt, publicKey) {
                    var buffer = Buffer.from(toEncrypt);
                    var encrypted = crypto.publicEncrypt(publicKey, buffer);
                    return encrypted.toString("base64");
                };

                var decryptString = function(toDecrypt, privateKey) {
                    var buffer = Buffer.from(toDecrypt, "base64");
                    
                    const decrypted = crypto.privateDecrypt(
                        {
                            key: privateKey.toString(),
                            passphrase: passphrase,
                        },
                        buffer,
                    )
                    return decrypted.toString("utf8");
                };


                let encryptedReviewData = encryptString(stringReviewData, node.publicKey)
                console.log('Encrypted value: '+encryptedReviewData)
                let decryptedReviewData = decryptString(encryptedReviewData, node.privateKey);
                console.log("Decrypted value: "+decryptedReviewData)


                //########################################### end ##################
                console.log('Node Details:')
                console.log(node)
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