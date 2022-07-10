const express= require('express')
const router = express.Router()
const mongoose= require('mongoose')
const User= require('../models/user')
const bcrypt= require('bcrypt')

router.post('/signup',(req,res,next)=>{
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hash(req.body.password,10)
    })
})

router.post('/login',(req,res,next)=>{

})

module.exports= router