const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcrypt')

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

module.exports = router