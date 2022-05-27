
const { createHash, randomInt } = require('crypto');

class Block{
    constructor(transactions=[]){
        this.timestamp = Date.now().toString()
        this.transactions = transactions;
        this.hash = this.getHash();
        this.previousHash = '';
    }
    getHash(){
        return createHash('sha256','rechain').update(JSON.stringify(this.timestamp+ this.transactions + this.previousHash)).digest('hex')
    }
}

class Rechian {
    constructor(){

        this.chain = [new Block()] ;
        
    }

    getPreviousBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(block){
        block.hash = block.getHash();
        block.previousHash = this.getPreviousBlock().hash;

        this.chain.push(block);
    }

    isValid(blockchain = this){
        for(let i = 1; i< blockchain.chain.length; i++){
            const currentBlock = blockchain.chain[i];
            const previousBlock = blockchain.chain[i-1];

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
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
    
}

class Mempool {
    constructor(data=[]){
        this.data =data
    }
}

module.exports = {
    Rechian,Block, Mempool
}