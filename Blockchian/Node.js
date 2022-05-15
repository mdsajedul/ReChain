
const eccrypto = require('eccrypto')

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
        // need function for create publickey private key and point 
        this.publicKey = getPublicKey();
        this.privateKey = getPrivateKey();
        this.role = object.role;
        this.point = 5;
    }

}

module.exports = Node