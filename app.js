const express = require('express')
const Rechain = require('./Blockchian/Rechain')
const minerRouter = require('./Router/minerRouter');

const app = express()

const port = 8000

// app.use('/',userRouter)
app.use('/miner', minerRouter);

app.listen(port,()=>{
    console.log(`ReChain server is runnig on PORT ${port}`)
})