class Rechian {
    constructor(chain){
        this.chain = chain ;
        
    }
    createBlock(nonce,previousHash) {
        block = {
            'index': length(self.chain),
            'timestamp': new Date().toString(),
            'nonce':nonce,
            'previousHash':previousHash
        }
        this.chain.push(block)
        return block;
    }
}
