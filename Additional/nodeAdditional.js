var crypto = require("crypto");

let encryptString = function(value,publicKey){
    let buffer = Buffer.from(value);
    let encrypted = crypto.publicEncrypt(publicKey,buffer)
    return encrypted.toString('base64');
}

let decryptString = function(value,privateKey){
    console.log(privateKey)
    let buffer = Buffer.from(value,'base64')
    let decrypted = crypto.privateDecrypt(
        {
            key: privateKey,
            passphrase:''
            // padding:crypto.constants.RSA_PKCS1_PADDING
        },
        buffer,
    )
    return decrypted.toString('utf-8')
}

module.exports = {
    encryptString,
    decryptString
}