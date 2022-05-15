
const eccrypto = require('eccrypto')
const fs = require('fs')

const getPrivateKey = ()=>{
    const privateKey = eccrypto.generatePrivate();
    const hexValue = privateKey.toString('base64');
    return hexValue
}

const getPublicKey = ()=>{
    const bufferPrivateKey =new Buffer(getPrivateKey(),'base64')
    const publicKey = eccrypto.getPublic(bufferPrivateKey) .toString('base64')
    return publicKey;
}


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
        this.publicKey = getPublicKey();
        this.privateKey = getPrivateKey();
        this.role = object.role;
        if(this.role=='user'){
            this.point = 50
        }
        else if(this.role == 'miner'){
            this.point = 100
        }

        
    }

}

module.exports = Node