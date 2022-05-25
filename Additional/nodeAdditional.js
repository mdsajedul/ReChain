var crypto = require("crypto");
const { user, miner } = require("../controller/nodeController");
const passphrase = "rechain"

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
function processReviewData(data,publicKey){

    let reviewData = data.reviewData;
    let stringReviewData = JSON.stringify(reviewData);
    let encryptedReviewData = encryptString(stringReviewData,publicKey)
    data.reviewData = encryptedReviewData;
  
    return data
  }
  
//   incomming reviews container and send review to other peers after proccesed
  function reviewDataContainer(data){
    if(data.role==='user'){
      if(data.username===user.username){
       data = processReviewData(data,user.publicKey)
       console.log(data)
        return data
      }
    }
    else if(data.role==='miner'){
      if(data.username===miner.username){
        data = processReviewData(data,miner.publicKey)
        console.log(data)
        return data
      }
    }
  
  }
  

module.exports = {
    encryptString,
    decryptString,
    reviewDataContainer
}