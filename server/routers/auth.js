const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.get('/protected',requireLogin,(req,res)=>{
  res.send("Hello user")
})

router.post('/signup',(req,res)=>{
  const {name,email,password} = req.body

  if(!email || !password || !name){
    return res.status(422).json({
        error:"Please all the fields"
    })
  }else{
    User.findOne({email:email})
    .then((savedUser)=>{
      if(savedUser){
        return res.status(200).json({
          error:"User already exists!"
        })
      }
      bcrypt.hash(password, 12)
      .then(hashedPassword =>{
        const user = new User({
          email,
          password:hashedPassword,
          name
        })
        user.save()
        .then(user=>{
          res.json({
            message:"saved successfully"
          })
          .catch(err=>{
            console.log(err)
          })
        })
      }) 
    })
    .catch(err=>{
      conssole.log(err)
    })
  }
})

router.post('/signin',(req,res)=>{
  const { email, password } = req.body

  if(!email || !password){
    res.status(422).json({error: "Please provide email or password!"})
  }
  User.findOne({email:email})
  .then(savedUser => {
    if(!savedUser){
      return res.status(422).json({error: "Invalid email address or password"})
    }
    bcrypt.compare(password, savedUser.password)
    .then(doMatch =>{
      if(doMatch){
        // res.json({message:"Login successfully"})
        const token = jwt.sign({ _id: savedUser._id}, JWT_SECRET)
        res.json({token})
      }else{
        return res.status(422).json({error: "Invalid email address or password"})
      }
    })
    .catch(err => console.log(err))
  })
})

module.exports = router