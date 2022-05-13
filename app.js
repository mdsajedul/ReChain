const express = require('express')
const bodyParser = require('body-parser')
const Rechain = require('./Blockchian/Rechain')
const minerRouter = require('./Router/minerRouter');
const userRouter = require('./Router/userRouter')


const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const port = 8000

app.use('/user',userRouter)
app.use('/miner', minerRouter);

app.listen(port,()=>{
    console.log(`ReChain server is runnig on PORT ${port}`)
})