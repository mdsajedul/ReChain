
const { generateKeyPairSync } = require('crypto')
const passphrase = "rechain"


    //asymetric key pair generate
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
    

class Node {

    constructor(username,password,email,publicKey,privateKey,role,point){
        this.username = username
        this.password = password
        this.email = email
        this.publicKey = publicKey
        this.privateKey = privateKey
        this.role = role
    }


    nodeCreate(object){
        this.username = object.username;
        this.password = object.password;
        this.email = object.email;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.role = object.role;
    }

}

class User extends Node{
    constructor(username,password,email,publicKey,privateKey,role,point){
        super(username,password,email,publicKey,privateKey,role,point)
    }
    
}

class Miner extends Node{
    constructor(username,password,email,publicKey,privateKey,role,point){
        super(username,password,email,publicKey,privateKey,role,point)
        this.reviewArray = [];
    }
}

module.exports = {
    Node,User,Miner
}