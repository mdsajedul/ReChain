
const { createHash, randomInt } = require('crypto');
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256');
const { miner } = require('../controller/nodeController');

class Block{
    constructor(transactions=[]){
        this.timestamp = Date.now().toString()
        this.transactions = transactions;
        this.hash = this.getHash();
        this.previousHash = '';
        this.merkleRoot = this.getMerkleRoot()
        this.index = 1
        this.miner = miner.username;
        this.nonce = 0;
    }
  
    getHash(){
        return createHash('sha256','rechain').update(JSON.stringify(this.timestamp+ this.transactions + this.previousHash + this.nonce )).digest('hex')
    }

    getMerkleRoot(){
        const leaves = this.transactions.map(x => SHA256(x))
        const tree = new MerkleTree(leaves, SHA256)
        const root = tree.getRoot().toString('hex')
        return root
    }

    mine(dificulty){
        while(!this.hash.startsWith(Array(dificulty + 1).join('0'))) {
            this.nonce++;
            this.hash = this.getHash();
        }
    }
}

class Rechian {
    constructor(){

        this.chain = [new Block()] ;
        this.dificulty = 1;
        this.blockTime = 40000;
        
    }

    getPreviousBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(block){
        block.hash = block.getHash();
        block.previousHash = this.getPreviousBlock().hash;
        block.index = this.chain.length + 1
        block.mine(this.dificulty)
        this.chain.push(block);

        this.dificulty += Date.now() - parseInt(this.getPreviousBlock().timestamp) < this.blockTime ? 1 : -1;
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

    

    
    
}

class Mempool {
    constructor(data=[]){
        this.data =data
    }
}

module.exports = {
    Rechian,Block, Mempool
}