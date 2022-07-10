const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: {type: String,required:true}, 
    username:{type: String,required:true,unique:true}, 
    password: {type: String,required:true}, 
    bio:String,
    pfp:String,
    is_staff:{type:Boolean,default:false},
    posts:Number,
    likes:Number


})

module.exports = mongoose.model('User',userSchema)