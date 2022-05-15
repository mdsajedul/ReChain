
// const eccrypto = require('eccrypto')
const crypto = require('crypto')
const { generateKeyPairSync } = require('crypto')
const fs = require('fs')
const { writeFileSync } = require('fs')
const passphrase = "mySecret"



    const { publicKey, privateKey } = generateKeyPairSync('rsa', 
    {
            modulusLength: 4096,
            namedCurve: 'secp256k1', 
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'     
            },     
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: passphrase
            } 

        })
    //For testing 
    // writeFileSync('private.pem', privateKey)
    // writeFileSync('public.pem', publicKey)


    // writeFileSync('publicKey.json',publicKey)
    // writeFileSync('privatekey.json',privateKey)


//     return {publicKey,privateKey}
// }

// const publicKey =()=>{
//     const 
// }

// const getPrivateKey = ()=>{
//     const privateKey = eccrypto.generatePrivate();
//     const hexValue = privateKey.toString('base64');
//     return hexValue
// }

// const getPublicKey = ()=>{
//     const bufferPrivateKey =new Buffer(getPrivateKey(),'base64')
//     const publicKey = eccrypto.getPublic(bufferPrivateKey) .toString('base64')
//     return publicKey;
// }


class Node {

    constructor(username,password,email,publicKey,privateKey,role,point){
        this.username = username
        this.password = password
        this.email = email
        this.publicKey = publicKey
        this.privateKey = privateKey
        this.role = role
        this.point = point
    }


    nodeCreate(object){
        this.username = object.username;
        this.password = object.password;
        this.email = object.email;
        this.publicKey = publicKey;
        console.log("public key from node :"+ this.publicKey)
        this.privateKey = privateKey;
        console.log("private key from node :"+ this.privateKey)

        this.role = object.role;
        if(this.role=='user'){
            this.point = 50
        }
        else if(this.role == 'miner'){
            this.point = 100
        }

        
        
    }

}

module.exports = {
    Node
}