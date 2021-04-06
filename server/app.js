const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 5000
const { MONGOURI } = require('./keys')

mongoose.connect(MONGOURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
  console.log('connected to mongoDB!')
})
mongoose.connection.on('error',(err)=>{
  console.log('error connecting to mongoDB!', err)
})


app.listen(PORT, ()=>{
  console.log("server is running on", PORT)
})
