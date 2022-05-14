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
        this.publicKey = 'newPublicKey'; 
        this.privateKey = 'newPrivateKey';
        this.role = object.role;
        this.point = 5;
    }

}

module.exports = Node