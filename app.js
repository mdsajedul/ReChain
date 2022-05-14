const express = require('express')
const bodyParser = require('body-parser')
const Rechain = require('./Blockchian/Rechain')
const minerRouter = require('./Router/minerRouter');
const userRouter = require('./Router/userRouter')
const nodeRouter = require('./Router/nodeRouter')


const app1 = express()
const app2 = express()


app1.use(bodyParser.urlencoded({extended:true}))
app1.use(bodyParser.json())

app1.use('/user',userRouter);
app1.use('/miner', minerRouter);
app1.use('/', nodeRouter);


app2.use(bodyParser.urlencoded({extended:true}))
app2.use(bodyParser.json())

app2.use('/user',userRouter)
app2.use('/miner', minerRouter);


app1.listen(8000,()=>{
    console.log(`ReChain server is runnig on PORT 8000`)
})
app2.listen(8001,()=>{
    console.log(`ReChain server is runnig on PORT 8001`)
})