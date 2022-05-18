var crypto = require("crypto");
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

module.exports = {
    encryptString,
    decryptString
}