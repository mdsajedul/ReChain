var crypto = require("crypto");
const { user, miner } = require("../controller/nodeController");
const passphrase = "rechain"
const fs = require('fs');
var uuid = require('uuid');

const res = require("express/lib/response");
const { Mempool } = require("../Blockchian/Rechain");

var mempool = new Mempool()
mempool.data ='dello'


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


// incoming reviews process 
function processReviewData(reveiwInfo,publicKey){

  let mempoolArray =[];
  let newMemPoolArray =[];

  fs.readFile('mempool.json','utf-8',(err,data)=>{
    if(err){
      res.send(err)
    }
    else{
      mempoolArray= JSON.parse(data.toString())
      let reviewData = reveiwInfo.reviewData;
      let stringReviewData = JSON.stringify(reviewData);
      let encryptedReviewData = encryptString(stringReviewData,publicKey)
      reveiwInfo.reviewData = encryptedReviewData;
      reveiwInfo.reviewId = uuid.v1();
      mempoolArray.push(reveiwInfo);
      mempool.data = mempoolArray
       newMemPoolArray = JSON.stringify(mempoolArray)
      //  mempool.data = newMemPoolArray;
      fs.writeFile('mempool.json', newMemPoolArray, (err)=>{
        if(err){
            return err;
        }
        else{
            // console.log('reveiw:' +newMemPoolArray)
            
            return newMemPoolArray
        }
    })
    

    // console.log('reveiw:' +newMemPoolArray)
    }
  })
 
}
  
//   incomming reviews container and send review to other peers after proccesed
  function reviewDataContainer(data){
    if(data.role.toLowerCase()==='user'){
      if(data.username===user.username){
       data = processReviewData(data,user.publicKey)
       console.log('reveiw: '+ mempool.data)
        return data
      }
    }
    else if(data.role.toLowerCase()==='miner'){
      if(data.username===miner.username){
        data = processReviewData(data,miner.publicKey)
        console.log('reveiw: '+ mempool.data)
        return data
      }
    }
  
  }
  

module.exports = {
    encryptString,
    decryptString,
    reviewDataContainer,
    mempool
}