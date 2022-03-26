
const { createHash, randomInt } = require('crypto');

class Rechian {
    constructor(chain){
        this.chain = [] ;
        
    }
    createBlock(nonce = 1,previousHash = 0 ) {
       const block = {
            'index': 1,
            'timestamp': new Date().toString(),
            'nonce':nonce,
            'previousHash':previousHash
        }
        this.chain.push(block);
        return block;
    }

    getPreviousBlock(){
        return this.chain[-1];
    }

    dificulty(){
        let previousNonce = ((Math.random(1,1000))*Math.random(1,100));
        let nonce = previousNonce + 5;
        console.log(nonce);
        console.log(previousNonce);
        const previousNonceString = previousNonce.toString();
        const target = '000000';
        
        let hash= createHash('sha256').update(previousNonceString).digest('hex');
        while(hash.substring(0,6) !== target){
            nonce++;
            hash = createHash('sha256').update(nonce.toString()).digest('hex');
        }
        previousNonce=(Math.random(1,100) + nonce)/Math.random(50,100);
        return {'hash':hash,'nonce':nonce,'previousNonce':previousNonce};
    }
    

    hash(block){
        
    }
}

module.exports = Rechian;