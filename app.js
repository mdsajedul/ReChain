const express = require('express')
const Rechain = require('./Blockchian/Rechain')

const app = express()

const port = 8000

app.listen(port,()=>{
    console.log(`ReChain server is runnig on PORT ${port}`)
})