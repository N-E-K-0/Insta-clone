const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")

router.get('/post/all',(req,res)=>{
  Post.find()
  .populate("postedBy", "_id name")
  .then(posts =>{
    res.json({posts})
  })
  .catch(err => console.log(err))
})

router.post('/post/create',requireLogin,(req,res)=>{
  const{ title,body,image } = req.body

  if(!title || !body || image){
    return res.status(422).json({error:"Please provide tile or body"})
  }
  req.user.password = undefined
  const post = new Post({
    title,
    body,
    image,
    postedBy: req.user
  })
  post.save()
  .then(result=> res.json({post:result}))
  .catch(err =>console.log(err))
})

router.get('/post/my',requireLogin,(req,res)=>{
  Post.find({postedBy: req.user._id})
  .populate("postedBy", "_id name")
  .then(mypost =>{
    res.json({mypost})
  })
  .catch(err => console.log(err))
})

module.exports = router