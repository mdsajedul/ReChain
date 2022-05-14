class Node {

    constructor(username,password,email,publicKey,privateKey,role){
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
        this.publicKey = 'newPublicKey';
        this.privateKey = 'newPrivateKey';
        this.role = object.role;
    }

}

module.exports = Node