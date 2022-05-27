const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io');


const minerRouter = require('./Router/minerRouter');
const userRouter = require('./Router/userRouter')
const nodeRouter = require('./Router/nodeRouter');
const {  reviewDataContainer } = require('./Additional/nodeAdditional');


const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const server = http.createServer(app)

const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
      }
})


// let isSend;
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("submit_review",(data)=>{
      console.log(data)
      const newData = reviewDataContainer(data)
      console.log(newData)
      socket.broadcast.emit('receive_reviews',newData)
      
    })
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
});



app.use('/user',userRouter);
app.use('/miner', minerRouter);
app.use('/', nodeRouter);



server.listen(8000, ()=>{
    console.log(`ReChain is running on PORT 8000`)
})

