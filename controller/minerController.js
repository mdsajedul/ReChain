const ReChain = require('../Blockchian/Rechain');
const { node } = require('./nodeController');

const rechain =new ReChain();

function mineBlock(req,res,send){
    // const previousBlock = rechain.getPreviousBlock();
    // const prevousNonce = previousBlock['nonce']

    rechain.createBlock()

    console.log(node)

    res.send({
        'message':'Mine successfull',
        'Block':rechain.chain
        
    })
}

module.exports={
    mineBlock
}